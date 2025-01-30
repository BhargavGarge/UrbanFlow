import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { icons } from "../constants";
import { formatTime } from "../lib/utils";
import { DriverCardProps } from "../types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.card,
        selected === item.id ? styles.selectedCard : styles.unselectedCard,
      ]}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        style={styles.profileImage}
      />

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.ratingIcon} />
            <Text style={styles.ratingText}>4</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.priceContainer}>
            <Image source={icons.dollar} style={styles.priceIcon} />
            <Text style={styles.priceText}>${item.price}</Text>
          </View>

          <Text style={styles.separator}>|</Text>
          <Text style={styles.detailsText}>{formatTime(item.time!)}</Text>

          <Text style={styles.separator}>|</Text>
          <Text style={styles.detailsText}>{item.car_seats} seats</Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={styles.carImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  selectedCard: {
    backgroundColor: "white", // Example selected color
  },
  unselectedCard: {
    backgroundColor: "white",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  ratingIcon: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceIcon: {
    width: 16,
    height: 16,
  },
  priceText: {
    fontSize: 14,
    marginLeft: 6,
  },
  separator: {
    fontSize: 14,
    color: "#6B7280",
    marginHorizontal: 6,
  },
  detailsText: {
    fontSize: 14,
    color: "#6B7280",
  },
  carImage: {
    width: 56,
    height: 56,
  },
});

export default DriverCard;
