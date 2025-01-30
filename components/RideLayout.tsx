import { router } from "expo-router";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "../constants";
import Maps from "./Maps";

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <View style={styles.backButton}>
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>{title || "Go Back"}</Text>
          </View>
          <Maps />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#3b82f6", // Blue background
  },
  header: {
    flexDirection: "row",
    position: "absolute",
    top: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 15,
  },
});

export default RideLayout;
