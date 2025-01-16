import React from "react";
import { View, Image } from "react-native";

import { GoogleInputProps } from "types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "../constants/index";
const googlePlaceKey = "AIzaSyBpjyeVfIasBlWysKRUTyj1zMZd8ELT-b8";
const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <View className="justify-center items-center w-6 h-6"></View>
      <GooglePlacesAutocomplete
        placeholder="Where you want to go?"
        debounce={200}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
            // Add placeholder text color here
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        textInputProps={{
          placeholderTextColor: "#9A9A9A",
          placeholder: initialLocation ?? "Where do you want to go?", // Properly apply placeholder text color here
        }}
        query={{
          key: googlePlaceKey,
          language: "en",
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default GoogleTextInput;
