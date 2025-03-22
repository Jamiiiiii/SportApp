import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirebaseProvider } from './FirebaseContext';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import WorkoutHistoryScreen from './screens/WorkoutHistoryScreen';
import EditWorkoutScreen from './screens/EditWorkoutScreen';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons'; // For icons

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
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        tabBarStyle: { paddingBottom: 10, height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: 'tomato', // Customize active tab color
        tabBarInactiveTintColor: 'gray', // Customize inactive tab color
      }}
    >
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-time" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateWorkout"
        component={CreateWorkoutScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-add-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function SportsApp() {
  return (
    <FirebaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FirebaseProvider>
  );
}
