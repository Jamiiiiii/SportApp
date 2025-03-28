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

// Function to get month name from a date
const getMonthName = (date) => {
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
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

// Modify the existing function to store months properly
const getMonthYear = (date) => {
  return {
    key: `${date.getFullYear()}-${date.getMonth() + 1}`,
    label: getMonthName(date),
  };
};

// Function to get the year
const getYear = (date) => date.getFullYear();

const WorkoutHistoryScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [viewMode, setViewMode] = useState("week");
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch workouts from Firestore
  const fetchWorkouts = async () => {
    const workoutsRef = collection(db, "workouts");
    const querySnapshot = await getDocs(workoutsRef);
    const workoutsData = querySnapshot.docs.map((doc) => doc.data());

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

  // Group workouts by month
const groupWorkoutsByMonth = () => {
  const months = {};
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-based index

   // List of month names
   const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  workouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);
    const workoutYear = workoutDate.getFullYear();
    const workoutMonth = workoutDate.getMonth(); // 0-based index

    // Only include workouts from this year up to the current month
    if (workoutYear === currentYear && workoutMonth <= currentMonth) {
      const { key, label } = getMonthYear(workoutDate);  // Use existing getMonthYear function

      if (!months[key]) {
        months[key] = { label, count: 0 };
      }

      months[key].count += 1;
    }
  });

   // Sort months in the correct order (from January to December)
   const sortedMonths = Object.entries(months).sort((a, b) => {
    return monthNames.indexOf(a[0]) - monthNames.indexOf(b[0]);
  });

  // Return the sorted months with their counts
  const sortedMonthData = sortedMonths.reduce((acc, [month, count]) => {
    acc[month] = count;
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

  const weeks = groupWorkoutsByWeek();
  const months = groupWorkoutsByMonth();
  const years = groupWorkoutsByYear();
  const currentWeek = getWeekNumber(new Date());
  const allWeeks = Array.from({ length: currentWeek }, (_, i) => i + 1);
  const allMonths = Object.keys(months).sort();
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
                <Text style={styles.weekTitle}>Week {week}</Text>
                {Object.keys(workoutsForWeek).length > 0 ? (
                  Object.entries(workoutsForWeek).map(([sport, count]) => (
                    <Text
                      key={sport}
                      style={styles.itemText}
                    >{`${count}x ${sport}`}</Text>
                  ))
                ) : (
                  <Text style={styles.itemText}>No workouts</Text>
                )}
              </View>
            );
          })}

        {viewMode === "month" &&
          Object.values(months).map(({ label, count }) => (
            <View key={label} style={styles.weekContainer}>
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
