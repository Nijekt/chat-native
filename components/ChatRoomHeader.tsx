import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Router } from "expo-router";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import avatarImg from "@/assets/images/avatar.png";

type Props = {
  user: any;
  router: Router;
};

const ChatRoomHeader: FC<Props> = ({ user, router }) => {
  return (
    <View className="bg-white p-4 flex-row items-center gap-3 border-b border-neutral-300">
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
      </TouchableOpacity>

      <Image
        source={user?.profileUrl}
        className="rounded-full"
        placeholder={avatarImg}
        style={{
          height: hp(4.5),
          width: hp(4.5),
          aspectRatio: 1,
          borderRadius: 100,
        }}
      />
      <Text className="text-neutral-700 font-medium text-lg">
        {user?.userName}
      </Text>
    </View>
  );
};

export default ChatRoomHeader;
