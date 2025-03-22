import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useFirebase } from '../FirebaseContext';
import styles from '../styles/AuthStyles'; // Import external styles

const AuthScreen = ({ navigation }) => {
  const { register, login } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Create a reference for the password input field
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.replace('Home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>SportsApp</Text>
        <TextInput 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          style={styles.input} 

          
          returnKeyType="next" // iOS will show a "next" button for multiple inputs
          onSubmitEditing={() => passwordInputRef.current.focus()} // Focus next field
        />
        <TextInput 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          style={styles.input} 
          ref={passwordInputRef} // Use the reference for the password input
          returnKeyType="done" // iOS will show a "done" button
          onSubmitEditing={handleLogin}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
