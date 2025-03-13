import { View, Text } from "react-native";
import React, { FC } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  message: any;
  currentUser: any;
};
const MessageItem: FC<Props> = ({ message, currentUser }) => {
  if (currentUser?.uid == message?.userId) {
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }} className="text-neutral-600">
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: wp(80) }} className="mb-3 ml-3">
        <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
          <Text style={{ fontSize: hp(1.9) }} className="text-neutral-600">
            {message?.text}
          </Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
