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

import registerImg from "@/assets/images/register.png";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomKeyBoardView from "@/components/CustomKeyBoardView";
import { useAuth } from "@/context/authContext";
const signUp = () => {
  const router = useRouter();
  const { register } = useAuth();

  const emaiRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const userNameRef = useRef<string>("");
  const profileRef = useRef<string>("");

  const handleRegister = async () => {
    if (
      !emaiRef.current ||
      !passwordRef.current ||
      !userNameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("signUp", "Please enter all fields");
    }

    let response = await register(
      emaiRef.current.toString(),
      passwordRef.current.toString(),
      userNameRef.current.toString(),
      profileRef.current.toString()
    );

    if (!response.success) {
      Alert.alert("signUp", response.msg);
    }
  };
  return (
    <CustomKeyBoardView>
      {/* <Text>signUp</Text> */}
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12 bg-white"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(20) }}
            resizeMode="contain"
            source={registerImg}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Register
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <AntDesign name="user" size={hp(3)} color="gray" />
              <TextInput
                onChangeText={(value) => (userNameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="UserName"
                placeholderTextColor={"gray"}
              />
            </View>
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

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Octicons name="image" size={hp(3)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="ProfileUrl"
                placeholderTextColor={"gray"}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="bg-neutral-800 rounded-2xl"
            >
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-bold tracking-wider text-center py-4 "
              >
                Register
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center gap-2">
              <Text
                style={{ fontSize: hp(1.5) }}
                className="font-semibold text-neutral-500 "
              >
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("/signIn")}>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
};

export default signUp;
