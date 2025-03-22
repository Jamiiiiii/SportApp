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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Welcome') {
            iconName = focused ? 'list-outline' : 'list-outline'; // Correct icon names
          } else if (route.name === 'Create Workout') {
            iconName = focused ? 'add-outline' : 'add-outline'; // Correct icon names
          } else if (route.name === 'Settings') {
            iconName = focused ? 'options-outline' : 'options-outline'; // Correct icon names
          } else if (route.name === 'Workout History') {
            iconName = focused ? 'calendar-outline' : 'calendar-outline'; // Correct icon names
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Create Workout" component={CreateWorkoutScreen} />
      <Tab.Screen name="Workout History" component={WorkoutHistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

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
