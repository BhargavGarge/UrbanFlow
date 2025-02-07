import React, { useEffect, useState } from "react";
import MapViewDirections from "react-native-maps-directions";

import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useDriverStore, useLocationStore } from "store";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "lib/map";
import { MarkerData, Driver } from "types/type";
import { icons } from "../constants/index";
import { useFetch } from "lib/fetch";
import { ActivityIndicator, View, Text } from "react-native";

export default function Maps() {
  const directionAPI = "AIzaSyCuBuAyLHdqCJmxic6imaPfGIPpG3fs7I4";
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  const { selectedDriver, setDrivers } = useDriverStore();
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  // Move drivers to a state variable

  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Generate markers whenever drivers, userLatitude, or userLongitude changes
  useEffect(() => {
    if (userLatitude && userLongitude && Array.isArray(drivers)) {
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  return (
    <MapView
      key={markers.length} // Force re-render of the map when markers update
      className="w-full h-full rounded-2xl"
      tintColor="black"
      // mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 10,
      }}
      provider={PROVIDER_DEFAULT}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={directionAPI}
            strokeColor="#b302ff"
            strokeWidth={4}
          />
        </>
      )}
    </MapView>
  );
}
