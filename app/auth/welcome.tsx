import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants/index";

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const getBgVariantStyle = (
    variant: "primary" | "secondary" | "danger" | "outline" | "default"
  ) => {
    switch (variant) {
      case "secondary":
        return "bg-gray-500";
      case "danger":
        return "bg-red-500";
      case "outline":
        return "bg-transparent border-neutral-300 border-[0.5px]";
      default:
        return "bg-[#9A63F2]";
    }
  };

  const getTextVariantStyle = (
    variant: "default" | "primary" | "secondary" | "danger"
  ) => {
    switch (variant) {
      case "primary":
        return "text-black";
      case "secondary":
        return "text-gray-100";
      case "danger":
        return "text-red-100";
      default:
        return "text-white";
    }
  };
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/auth/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#9A63F2] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px] rounded-lg"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-red text-4xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        onPress={() =>
          isLastSlide
            ? router.replace("/auth/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className={`w-11/12 mt-10 mb-5 p-3 flex flex-row justify-center items-center rounded-full shadow-md shadow-neutral-400/70 ${getBgVariantStyle(isLastSlide ? "primary" : "default")}`}
      >
        <Text className={`text-lg font-bold ${getTextVariantStyle("default")}`}>
          {isLastSlide ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
