import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firestore reference
import styles from '../styles/CreateWorkoutStyles'; // Import styles

const CreateWorkoutScreen = () => {
  const [selectedSport, setSelectedSport] = useState('');
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date()); // Temporary date for iOS modal
  const [notes, setNotes] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false); // iOS modal state

  // List of sports for dropdown
  const sports = ['Running', 'Cycling', 'Gym', 'Swimming', 'Muay Thai', 'Running & Cardio'];

  const saveWorkout = async () => {
    if (!selectedSport) {
      Alert.alert('Error', 'Please select a sport.');
      return;
    }

    try {
      await addDoc(collection(db, 'workouts'), {
        sport: selectedSport,
        date: date.toISOString(),
        notes: notes,
      });
      Alert.alert('Success', 'Workout saved successfully!');
      setSelectedSport('');
      setDate(new Date());
      setNotes('');
    } catch (error) {
      Alert.alert('Error', 'Could not save workout.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Workout</Text>

      {/* Sport Picker */}
      <Text>Select Sport:</Text>
      <Picker selectedValue={selectedSport} onValueChange={(itemValue) => setSelectedSport(itemValue)}>
        <Picker.Item label="Choose a sport" value="" />
        {sports.map((sport) => (
          <Picker.Item key={sport} label={sport} value={sport} />
        ))}
      </Picker>

      {/* Date Picker */}
      <Text>Select Date:</Text>
      <Button
        title="Pick a date"
        onPress={() => {
          if (Platform.OS === 'ios') {
            setTempDate(date); // Sync tempDate with current date when opening
            setShowModal(true);
          } else {
            setShowPicker(true);
          }
        }}
      />

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      {/* iOS Modal for Date Picker */}
      {Platform.OS === 'ios' && (
        <Modal visible={showModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempDate(selectedDate); // Store temporarily
                  }
                }}
              />
              {/* Confirm Button */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setDate(tempDate);
                  setShowModal(false);
                }}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <Text>Selected Date: {date.toDateString()}</Text>

      {/* Notes Input */}
      <Text>Notes:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter notes (optional)"
        value={notes}
        onChangeText={setNotes}
      />

      {/* Save Workout Button */}
      <Button title="Save Workout" onPress={saveWorkout} />
    </View>
  );
};

export default CreateWorkoutScreen;
