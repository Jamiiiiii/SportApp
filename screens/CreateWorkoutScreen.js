import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateWorkoutScreen = ({ navigation }) => {
  const [workoutType, setWorkoutType] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');

  const handleCreate = () => {
    // Save the new workout here
    // For now, we'll just log it
    console.log('New Workout:', { workoutType, workoutDate });
    navigation.goBack(); // Go back to the previous screen after creating
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Workout</Text>
      <TextInput
        value={workoutType}
        onChangeText={setWorkoutType}
        placeholder="Workout Type"
        style={styles.input}
      />
      <TextInput
        value={workoutDate}
        onChangeText={setWorkoutDate}
        placeholder="Workout Date"
        style={styles.input}
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default CreateWorkoutScreen;
