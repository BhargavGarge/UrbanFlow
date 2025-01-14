import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "./../../constants/index";
import InputField from "components/InputField";
import { Link } from "expo-router";
import OAuth from "components/OAuth"; // Ensure OAuth is a valid React component

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSignInPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View
          className="relative w-full h-[250px]
        "
        >
          {/* <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 250 }}
          /> */}

          <View
            style={{
              marginTop: 25,
            }}
          >
            <Text
              className=" text-black font-JakartaSemiBold mt-10 text-center "
              style={{
                fontSize: 30,
              }}
            >
              Welcome back!
            </Text>
            <Text className="text-2xl text-black font-JakartaLight text-center ">
              Your next ride awaits.
            </Text>
          </View>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter Your Mail"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter Secure Password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value: string) =>
              setForm({ ...form, password: value })
            }
          />
          <TouchableOpacity
            className="w-11/4 mt-10  mb-2 p-3 flex flex-row justify-center items-center rounded-full bg-[#9A63F2] "
            onPress={onSignInPress}
          >
            <Text className={`text-lg font-bold text-white`}>Sign In</Text>
          </TouchableOpacity>
          {/* OAuth */}
          <OAuth />
          <Link
            href="/auth/sign-up"
            className="text-lg text-center text-general-200 "
          >
            Don't have an account?
            <Text className="text-[#9A63F2]">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
