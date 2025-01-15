import React from "react";
import { View, Image, Text } from "react-native";
import { GoogleInputProps } from "types/type";
import { icons } from ".././constants";
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
      {/* You can add the icon and other elements here */}
    </View>
  );
};

export default GoogleTextInput;
