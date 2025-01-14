import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "./../../constants/index";
import InputField from "components/InputField";
import { Link } from "expo-router";
import OAuth from "components/OAuth";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSignUpPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View
          className="relative w-full h-[200px]
        "
        >
          {/* <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 200 }}
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
              Unlock the road ahead
            </Text>
            <Text className="text-2xl text-black font-JakartaLight text-center ">
              sign up and get moving!
            </Text>
          </View>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter Your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: string) => setForm({ ...form, name: value })}
          />
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
            className="w-11/4 mt-10  mb-2 p-3 flex flex-row justify-center items-center rounded-full bg-[##9A63F2] "
            onPress={onSignUpPress}
          >
            <Text className={`text-lg font-bold text-white`}>Sign Up</Text>
          </TouchableOpacity>
          {/* OAuth */}
          <OAuth />
          <Link
            href="/auth/sign-in"
            className="text-lg text-center text-general-200 "
          >
            Already have an account?{" "}
            <Text className="text-[#9A63F2]">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
