import { useAuth } from "@clerk/clerk-expo";
import ConfettiCannon from "react-native-confetti-cannon";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import CustomButton from "components/CustomButton";
import { images } from "../constants";
import { fetchAPI } from "../lib/fetch";
import { PaymentProps } from "../types/type";
import { useLocationStore } from "store";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();
  const { userId } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const openPaymentSheet = async () => {
    try {
      setLoading(true);
      console.log("🚀 Skipping payment. Directly confirming booking...");

      // 📝 Create ride record in DB (without payment)
      await fetchAPI("/(api)/ride/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime.toFixed(0),
          fare_price: parseInt(amount) * 100,
          payment_status: "pending",
          driver_id: driverId,
          user_id: userId,
        }),
      });

      // ✅ Show success modal
      setSuccess(true);
    } catch (error: any) {
      console.error("❌ Booking error:", error);
      Alert.alert(
        "Booking Error",
        error.message || "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomButton
        title={loading ? "Processing..." : "Confirm Ride"}
        className="my-10"
        onPress={openPaymentSheet}
        disabled={loading}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          {/* 🎉 Show Confetti on success */}
          {success && <ConfettiCannon count={200} origin={{ x: 180, y: 0 }} />}

          <Image source={images.check} className="w-28 h-28 mt-5" />
          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>
          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>
          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};
export default Payment;
