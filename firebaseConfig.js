import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCog4VQF4QKHRDejJKYKS7_Sz1XaHg1zJk",
  authDomain: "localhost",
  projectId: "sportapp-77447",
  storageBucket: "sportapp-77447.firebasestorage.app",
  messagingSenderId: "943852993607",
  appId: "1:943852993607:ios:6beb5dc9844c1b1d948562",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
