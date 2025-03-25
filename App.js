import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirebaseProvider } from './FirebaseContext';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import WorkoutHistoryScreen from './screens/WorkoutHistoryScreen';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen';
import { db, auth } from './firebaseConfig';
import { Ionicons } from '@expo/vector-icons'; // For icons

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
            iconName = focused ? 'list-outline' : 'list-outline'; 
          } else if (route.name === 'Create Workout') {
            iconName = focused ? 'add-outline' : 'add-outline'; 
          } else if (route.name === 'Settings') {
            iconName = focused ? 'options-outline' : 'options-outline'; 
          } else if (route.name === 'Workout History') {
            iconName = focused ? 'calendar-outline' : 'calendar-outline'; 
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
