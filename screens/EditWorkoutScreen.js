import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditWorkoutScreen = ({ route, navigation }) => {
  const { workout } = route.params;
  const [workoutType, setWorkoutType] = useState(workout.type);
  const [workoutDate, setWorkoutDate] = useState(workout.date);

  const handleSave = () => {
    // Save the updated workout here
    // For now, we'll just log it
    console.log('Updated Workout:', { workoutType, workoutDate });
    navigation.goBack(); // Go back to the previous screen after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Workout</Text>
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
      <Button title="Save" onPress={handleSave} />
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

export default EditWorkoutScreen;
