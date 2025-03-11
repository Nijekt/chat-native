import { Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { StatusBar, View } from "react-native";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("./(app)");
    } else if (isAuthenticated === false) {
      router.replace("./signIn");
    }
  }, [isAuthenticated]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} />
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarColor: "transparent",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: true, title: "Home" }}
        />
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
