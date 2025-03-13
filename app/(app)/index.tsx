import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import ChatList from "@/components/ChatList";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "@/firebaseConfig";

const HomePage = () => {
  const { user } = useAuth();
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  return (
    <View className="flex-1">
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
    </View>
  );
};

export default HomePage;
