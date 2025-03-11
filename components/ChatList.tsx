import { View, Text, FlatList } from "react-native";
import React, { FC } from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

type Props = {
  users: any;
};

const ChatList: FC<Props> = ({ users }) => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 20 }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            router={router}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
