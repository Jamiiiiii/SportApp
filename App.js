// App.js - Main entry point for SportsApp
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FirebaseProvider } from './FirebaseContext';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChfWPojiEyc04_UBxk__s3Up2nKGcVpRo",
  authDomain: "localhost",
  projectId: "sportapp-77447",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const Stack = createStackNavigator();

export default function SportsApp() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseProvider>
  );
}