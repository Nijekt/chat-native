import { View, Text, ScrollViewComponent, ScrollView } from "react-native";
import React, { FC } from "react";
import MessageItem from "./MessageItem";

type Prop = {
  messages: any;
  currentUser: any;
  scrollViewRef: any;
};

const MessagesList: FC<Prop> = ({ scrollViewRef, messages, currentUser }) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 20 }}
    >
      {messages.map((message: any, index: number) => (
        <MessageItem message={message} key={index} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
