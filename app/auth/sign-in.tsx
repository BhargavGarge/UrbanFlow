import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import { icons, images } from "./../../constants/index";
import InputField from "components/InputField";
import { Link, router } from "expo-router";
import OAuth from "components/OAuth"; // Ensure OAuth is a valid React component
import { useSignIn } from "@clerk/clerk-expo";
import CustomButton from "components/CustomButton";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View
          className="relative w-full h-[250px]
        "
        >
          <View
            style={{
              marginTop: 25,
            }}
          >
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
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />
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
