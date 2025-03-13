import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { FC, PropsWithChildren } from "react";

const ios = Platform.OS === "ios";
const CustomKeyBoardView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
      keyboardVerticalOffset={30}
    >
      <ScrollView
        style={{ flex: 1 }}
        // contentContainerStyle={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyBoardView;
