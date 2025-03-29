import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HistoryStyles";

// Function to get the week number of the year
const getWeekNumber = (date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.ceil((dayOfYear + 1) / 7);
};

// Function to get the year
const getYear = (date) => date.getFullYear();

const WorkoutHistoryScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [viewMode, setViewMode] = useState("week");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedWorkouts, setEditedWorkouts] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // Fetch workouts from Firestore
  const fetchWorkouts = async () => {
    const workoutsRef = collection(db, "workouts");
    const querySnapshot = await getDocs(workoutsRef);
    const workoutsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setWorkouts(workoutsData);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Group workouts by week
  const groupWorkoutsByWeek = () => {
    const weeks = {};
    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const weekNumber = getWeekNumber(workoutDate);

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = {};
      }

      const normalizedType = workout.sport?.trim().toLowerCase() || "unknown";

      if (weeks[weekNumber][normalizedType]) {
        weeks[weekNumber][normalizedType] += 1;
      } else {
        weeks[weekNumber][normalizedType] = 1;
      }
    });

    return weeks;
  };

  const weeks = groupWorkoutsByWeek();
  const currentWeek = getWeekNumber(new Date());
  const allWeeks = Array.from({ length: currentWeek }, (_, i) => i + 1);

  const openEditModal = (week) => {
    setSelectedWeek(week);
    setEditedWorkouts({ ...weeks[week] });
    setModalVisible(true);
    setDropdownVisible(null);
  };

  const handleEditWorkout = (sport, change) => {
    setEditedWorkouts((prev) => {
      const updatedCount = (prev[sport] || 0) + change;
      if (updatedCount <= 0) {
        const { [sport]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [sport]: updatedCount };
    });
  };

  const saveWorkoutChanges = async () => {
    // Update Firestore based on changes
    const selectedWeekWorkouts = workouts.filter(
      (workout) => getWeekNumber(new Date(workout.date)) === selectedWeek
    );

    for (const [sport, count] of Object.entries(editedWorkouts)) {
      const existingWorkouts = selectedWeekWorkouts.filter(
        (workout) => workout.sport?.trim().toLowerCase() === sport
      );

      const difference = count - existingWorkouts.length;

      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          await addDoc(collection(db, "workouts"), {
            sport,
            date: new Date().toISOString(),
          });
        }
      } else if (difference < 0) {
        for (let i = 0; i < Math.abs(difference); i++) {
          if (existingWorkouts[i]) {
            await deleteDoc(doc(db, "workouts", existingWorkouts[i].id));
          }
        }
      }
    }

    await fetchWorkouts();
    setModalVisible(false);
  };

  // Group workouts by month
  const groupWorkoutsByMonth = () => {
    const months = {};
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-based index

    // List of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const workoutYear = workoutDate.getFullYear();
      const workoutMonth = workoutDate.getMonth(); // 0-based index

      // Only include workouts from this year up to the current month
      if (workoutYear === currentYear && workoutMonth <= currentMonth) {
        const monthKey = `${workoutYear}-${workoutMonth + 1}`; // Key format: "2025-1"

        if (!months[monthKey]) {
          months[monthKey] = {
            label: `${monthNames[workoutMonth]} ${workoutYear}`, // Label in format "January 2025"
            count: 0,
          };
        }

        months[monthKey].count += 1;
      }
    });

    // Sort months in the correct order (from January to December)
    const sortedMonths = Object.entries(months).sort((a, b) => {
      const [keyA] = a;
      const [keyB] = b;
      return keyA.localeCompare(keyB); // Sort by "YYYY-M" key
    });

    // Return the sorted months with their counts
    const sortedMonthData = sortedMonths.reduce((acc, [monthKey, data]) => {
      acc[monthKey] = data;
      return acc;
    }, {});

    return sortedMonthData;
  };

  // Group workouts by year
  const groupWorkoutsByYear = () => {
    const years = {};
    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const year = getYear(workoutDate);

      if (!years[year]) {
        years[year] = 0;
      }

      years[year] += 1;
    });

    return years;
  };

  const months = groupWorkoutsByMonth();
  const years = groupWorkoutsByYear();
  const allYears = Object.keys(years).sort();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Workout History</Text>

        {/* Filter Button */}
        <TouchableOpacity
          onPress={() => setShowDropdown(true)}
          style={styles.filterButton}
        >
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => {
                setViewMode("week");
                setShowDropdown(false);
              }}
            >
              <Text style={styles.dropdownItem}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewMode("month");
                setShowDropdown(false);
              }}
            >
              <Text style={styles.dropdownItem}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewMode("year");
                setShowDropdown(false);
              }}
            >
              <Text style={styles.dropdownItem}>Yearly</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Workout History List */}
      <ScrollView>
        {viewMode === "week" &&
          allWeeks.map((week) => {
            const workoutsForWeek = weeks[week] || {};
            return (

              <View key={week} style={styles.weekContainer}>
                <View style={styles.weekHeader}>
                <Text style={styles.weekTitle}>Week {week}</Text>
                <TouchableOpacity onPress={() => setDropdownVisible(week)}>
                  <Ionicons style ={styles.Ionithreedots} name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
                </View>

                {Object.keys(workoutsForWeek).length > 0 ? (
                  Object.entries(workoutsForWeek).map(([sport, count]) => (
                    <Text key={sport} style={styles.itemText}>
                      {`${count}x ${sport}`}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.itemText}>No workouts</Text>
                )}
                
                {dropdownVisible === week && (
                  <View style={styles.editDropdown}>
                    <TouchableOpacity onPress={() => openEditModal(week)}>
                      <Text style={styles.editDropdownText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <Text style={styles.editTitle}>Edit Week {selectedWeek}</Text>
            {Object.entries(editedWorkouts).map(([sport, count]) => (
              <View key={sport} style={styles.editRow}>
                <TouchableOpacity onPress={() => handleEditWorkout(sport, -1)}>
                  <Text style={styles.modalButtonMinus}>-</Text>
                </TouchableOpacity>
                <Text style={styles.modalText}>{`${count}x ${sport}`}</Text>
                <TouchableOpacity onPress={() => handleEditWorkout(sport, 1)}>
                  <Text style={styles.modalButtonPlus}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={saveWorkoutChanges} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        {viewMode === "month" &&
          Object.entries(months).map(([monthKey, { label, count }]) => (
            <View key={monthKey} style={styles.weekContainer}>
              <Text style={styles.weekTitle}>{label}</Text>
              <Text style={styles.itemText}>{`${count} workouts`}</Text>
            </View>
          ))}

        {viewMode === "year" &&
          allYears.map((year) => (
            <View key={year} style={styles.weekContainer}>
              <Text style={styles.weekTitle}>{year}</Text>
              <Text style={styles.itemText}>{`${years[year]} workouts`}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default WorkoutHistoryScreen;
