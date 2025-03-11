import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import MessagesList from "@/components/MessagesList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomKeyBoardView from "@/components/CustomKeyBoardView";

const ChatRoom = () => {
  const item = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={"dark-content"} backgroundColor={"transparent"} />
      <ChatRoomHeader user={item} router={router} />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessagesList />
        </View>
        <View style={{ marginBottom: hp(1.7) }} className="pt-2">
          {/* <View className="flex-row justify-between items-center mx-3"> */}
          <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5 mx-2">
            <TextInput
              placeholder="Type a message..."
              style={{ fontSize: hp(2), height: hp(5) }}
              className="flex-1 mr-2 align-center"
            />
            <TouchableOpacity
              style={{ width: hp(5) }}
              className="bg-neutral-200 p-3 rounded-full flex justify-center items-center"
            >
              <Feather name="send" size={hp(2.5)} color={"#737373"} />
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
