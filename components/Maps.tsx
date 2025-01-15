import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
export default function Maps() {
  return (
    <MapView
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 1,
      }}
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView>
  );
}
