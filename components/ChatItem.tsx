import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import avatarImg from "@/assets/images/avatar.png";
import { getRoomID } from "@/utils/common";
import { db } from "@/firebaseConfig";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

type Props = {
  noBorder: any;
  router: any;
  item: any;
  index: number;
  currentUser: any;
};

const ChatItem: FC<Props> = ({
  noBorder,
  router,
  item,
  index,
  currentUser,
}) => {
  const [lastMessage, setLastMessage] = useState<DocumentData | undefined>(
    undefined
  );
  useEffect(() => {
    let roomId = getRoomID(currentUser?.uid, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setLastMessage(allMessages[0] ? allMessages[0] : undefined);
    });
    return unsub;
  }, []);

  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: item,
    });
  };

  const renderTime = () => {
    if (lastMessage) {
      return new Date(lastMessage?.createdAt.toDate()).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "numeric",
      });
    }
  };

  const renderLastMessage = () => {
    // return "";
    if (typeof lastMessage === "undefined") return "Say Hi 👋";

    if (lastMessage) {
      if (lastMessage?.userId === currentUser?.uid) {
        return "You: " + lastMessage?.text;
      } else {
        return lastMessage?.text;
      }
    }
  };

  console.log("lastMessage", lastMessage);

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
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.5) }}
          className="text-neutral-500 font-medium"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
