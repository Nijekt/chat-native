import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";

const Layout = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor={"#818cf8"} />
      <Stack
      // screenOptions={{ contentStyle: { backgroundColor: "#ffffff" } }}
      >
        <Stack.Screen
          name="index"
          options={{
            header: () => <HomeHeader />,
            headerStyle: { backgroundColor: "#818cf8" },
          }}
        />

        <Stack.Screen name="chatRoom" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default Layout;
