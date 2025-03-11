import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextValue {
  user: any;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string; data?: any }>;
  register: (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => Promise<{ success: boolean; msg?: string; data?: any }>;
  logout: () => void;
}

interface CustomUser extends User {
  userName?: string;
  profileUrl?: string;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid, user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: string, firebaseUser: User) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...firebaseUser,
        userName: data.userName,
        profileUrl: data.profileUrl,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response?.user };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const register = async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user.uid), {
        userName,
        profileUrl,
        userId: response?.user.uid,
      });

      return { success: true, data: response?.user };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("You have been logouted");

      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
