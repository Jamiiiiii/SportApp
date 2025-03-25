import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore reference
import styles from "../styles/CreateWorkoutStyles"; // Import styles

const CreateWorkoutScreen = () => {
  const [selectedSport, setSelectedSport] = useState("");
  const [tempSport, setTempSport] = useState(""); // Temporary sport selection
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date()); // Temporary date for iOS modal
  const [notes, setNotes] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false); // iOS modal state
  const [showSportModal, setShowSportModal] = useState(false); // Sport modal state

  // List of sports for dropdown
  const sports = [
    "Running",
    "Cycling",
    "Gym",
    "Swimming",
    "Muay Thai",
    "Running & Cardio",
  ];

  const saveWorkout = async () => {
    if (!selectedSport) {
      Alert.alert("Error", "Please select a sport.");
      return;
    }
    // Ensure notes is either an empty string or null
    const workoutNotes = notes.trim() === "" ? "" : notes;

    try {

      console.log('Saving workout:', {
        sport: selectedSport,
        date: date.toISOString(),
        notes: workoutNotes,
      });

      await addDoc(collection(db, "workouts"), {
        sport: selectedSport,
        date: date.toISOString(),
        notes: workoutNotes,
      });
      Alert.alert("Success", "Workout saved successfully!");
      setSelectedSport("");
      setDate(new Date());
      setNotes("");
    } catch (error) {
      Alert.alert("Error", "Could not save workout.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Workout</Text>

      {/* Sport Picker */}
      <Text>Select Sport:</Text>
      <Button title="Pick a sport" onPress={() => setShowSportModal(true)} />
      <Text>Selected Sport: {selectedSport || "None"}</Text>

      {/* Sport Selection Modal */}
      <Modal visible={showSportModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.sportModalContent}>
            <ScrollView>
              {sports.map((sport) => (
                <TouchableOpacity
                  key={sport}
                  style={[
                    styles.sportOption,
                    tempSport === sport && styles.selectedSport, // Apply selected style
                  ]}
                  onPress={() => setTempSport(sport)}
                >
                  <Text style={styles.sportOptionText}>{sport}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Confirm Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setSelectedSport(tempSport);
                setShowSportModal(false);
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      <Text>Select Date:</Text>
      <Button
        title="Pick a date"
        onPress={() => {
          if (Platform.OS === "ios") {
            setTempDate(date);
            setShowDateModal(true);
          } else {
            setShowPicker(true);
          }
        }}
      />

      {Platform.OS === "android" && showPicker && (
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
      {Platform.OS === "ios" && (
        <Modal visible={showDateModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.dateModalContent}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempDate(selectedDate);
                  }
                }}
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setDate(tempDate);
                  setShowDateModal(false);
                }}
              >
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
