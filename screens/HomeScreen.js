import React from 'react';
import { View, Text, Button } from 'react-native';
import { useFirebase } from '../FirebaseContext';

const HomeScreen = ({ navigation }) => {
  const { logout } = useFirebase();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to SportsApp!</Text>
      <Button title="Logout" onPress={() => logout().then(() => navigation.replace('Auth'))} />
    </View>
  );
};

export default HomeScreen;
