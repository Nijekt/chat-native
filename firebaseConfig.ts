// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV8oI3dTARFv4XEsmRgvjE2aJiFSNnnKw",
  authDomain: "fir-chat-48926.firebaseapp.com",
  projectId: "fir-chat-48926",
  storageBucket: "fir-chat-48926.firebasestorage.app",
  messagingSenderId: "460771227343",
  appId: "1:460771227343:web:46a227858ea118f5e069ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
