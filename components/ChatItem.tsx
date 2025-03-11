import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import avatarImg from "@/assets/images/avatar.png";
import { blurhash } from "@/utils/common";

type Props = { noBorder: any; router: any; item: any; index: number };

const ChatItem: FC<Props> = ({ noBorder, router, item, index }) => {
  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: item,
    });
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between items-center mx-4 gap-3 mb-4 pb-2 ${
        noBorder || "border-b border-b-neutral-200"
      }`}
    >
      {/* <Image
        source={avatarImg}
        style={{ height: hp(5), width: hp(5), aspectRatio: 1 }}
        className="rounded-full"
      /> */}
      <Image
        style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
        source={item?.profileUrl}
        placeholder={avatarImg}
        transition={1000}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(2) }}
            className="font-semibold text-neutral-600"
          >
            {item?.userName}
          </Text>
          <Text
            style={{ fontSize: hp(1.5) }}
            className="font-medium text-neutral-500"
          >
            Time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.5) }}
          className="text-neutral-500 font-medium"
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
