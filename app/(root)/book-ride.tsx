import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View, StyleSheet } from "react-native";

import RideLayout from "components/RideLayout";
import { icons } from "../../constants";
import { formatTime } from "../../lib/utils";
import { useDriverStore, useLocationStore } from "store";
import Payment from "components/Payment";
import { StripeProvider } from "@stripe/stripe-react-native";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  console.log("selectedDriver", selectedDriver);

  const driverDetails = drivers?.find(
    (driver) => +driver.id === selectedDriver
  );

  return (
    <StripeProvider
      publishableKey="pk_test_51QnKCySFbBQp9Ay5jRhgP22Z0OWeyjvraGLrXvaOsKp42ArRGaKHEaQKEfcYX7BrFevEDnMFGwRa9JSsJ746DS2C00YEXqEOR0"
      merchantIdentifier="merchant.uber.com" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
      <RideLayout title="Book Ride">
        <>
          <Text style={styles.title}>Ride Information</Text>

          <View style={styles.centeredContainer}>
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              style={styles.profileImage}
            />

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>
                {driverDetails?.first_name} {driverDetails?.last_name}
              </Text>

              <View style={styles.ratingContainer}>
                <Image
                  source={icons.star}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>{driverDetails?.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Ride Price</Text>
              <Text style={[styles.infoText, styles.priceText]}>
                ${driverDetails?.price}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Pickup Time</Text>
              <Text style={styles.infoText}>
                {formatTime(driverDetails?.time!)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Car Seats</Text>
              <Text style={styles.infoText}>{driverDetails?.car_seats}</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.addressText}>{userAddress}</Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.addressText}>{destinationAddress}</Text>
            </View>
          </View>
          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id ?? 0}
            rideTime={driverDetails?.time!}
          />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  centeredContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 4,
  },
  infoBox: {
    backgroundColor: "#ECF4FE",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
  },
  priceText: {
    color: "#0CC25F",
  },
  addressContainer: {
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  addressText: {
    fontSize: 18,
    fontWeight: "400",
  },
});

export default BookRide;
