import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import MessagesList from "@/components/MessagesList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomKeyBoardView from "@/components/CustomKeyBoardView";
import { useAuth } from "@/context/authContext";
import { getRoomID } from "@/utils/common";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ChatRoom = () => {
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomID(user?.uid, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
    // return unsub;
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: false });
    }, 100);
  };

  const createRoomIfNotExists = async () => {
    let roomId = getRoomID(user?.uid, item?.userId);

    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAT: Timestamp.fromDate(new Date()),
    });
  };

  const handleSetMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      let roomId = getRoomID(user?.uid, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");

      textRef.current = "";
      if (inputRef.current) (inputRef.current as TextInput).clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.uid,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.userName,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("newDoc:", newDoc.id);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle={"dark-content"} backgroundColor={"transparent"} />
      <ChatRoomHeader user={item} router={router} />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessagesList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
        </View>
        <View style={{ marginBottom: hp(1.7) }} className="pt-2">
          {/* <View className="flex-row justify-between items-center mx-3"> */}
          <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5 mx-2">
            <TextInput
              ref={inputRef}
              onChangeText={(text) => (textRef.current = text)}
              placeholder="Type a message..."
              style={{ fontSize: hp(2), height: hp(5) }}
              className="flex-1 mr-2 align-center"
            />
            <TouchableOpacity
              onPress={handleSetMessage}
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
