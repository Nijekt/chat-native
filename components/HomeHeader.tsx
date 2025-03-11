import { View, Text, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import reactLogo from "../assets/images/react-logo.png";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import { blurhash } from "@/utils/common";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MenuItem from "./MenuItem";
import { AntDesign, Feather } from "@expo/vector-icons";
import avatarImg from "../assets/images/avatar.png";

const ios = Platform.OS === "ios";

const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleProfile = () => {};

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between bg-indigo-400 px-5 pb-6 rounded-b-3xl"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger customStyles={{ triggerWrapper: { padding: 0 } }}>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={avatarImg}
              transition={1000}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: "white",
                width: 140,
              },
            }}
          >
            <MenuItem
              text={"Profile"}
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="black" />}
            />
            <MenuItem
              text={"Sign Out"}
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="black" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;
