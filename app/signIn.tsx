import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import signUpImg from "@/assets/images/sign-up.png";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
const signIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const emaiRef = useRef<
    string | NativeSyntheticEvent<TextInputChangeEventData>
  >("");
  const passwordRef = useRef<
    string | NativeSyntheticEvent<TextInputChangeEventData>
  >("");

  const handleLogin = async () => {
    if (!emaiRef.current || !passwordRef.current) {
      Alert.alert("signIn", "Please enter email and password");
    }

    const response = await login(
      emaiRef.current.toString(),
      passwordRef.current.toString()
    );

    if (!response.success) {
      Alert.alert("signUp", response.msg);
    }
  };
  return (
    <View className="flex-1">
      {/* <Text>signIn</Text> */}
      <View
        style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12 bg-white"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={signUpImg}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Octicons name="mail" size={hp(3)} color="gray" />
              <TextInput
                onChangeText={(value) => (emaiRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email"
                placeholderTextColor={"gray"}
              />
            </View>
            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
              >
                <Octicons name="lock" size={hp(3)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-bold text-neutral-500 text-right"
              >
                Forgot Password?
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-neutral-800 rounded-2xl"
            >
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-bold tracking-wider text-center py-4 "
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center gap-2">
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-semibold text-neutral-500 "
              >
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push("/signUp")}>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default signIn;
