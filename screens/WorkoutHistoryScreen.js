import React, { useEffect, useState } from 'react';
import styles from '../styles/HistoryStyles';
import { View, Text, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import Firestore reference

// Function to get the week number of the year for a given date
const getWeekNumber = (date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.ceil((dayOfYear + 1) / 7);
};

const WorkoutHistoryScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts from Firestore
  const fetchWorkouts = async () => {
    const workoutsRef = collection(db, 'workouts');
    const querySnapshot = await getDocs(workoutsRef);
    const workoutsData = querySnapshot.docs.map((doc) => doc.data());

    console.log('Fetched Workouts:', workoutsData); // Debugging log

    setWorkouts(workoutsData);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Group workouts by week of the year and count occurrences
  const groupWorkoutsByWeek = () => {
    const weeks = {};

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const weekNumber = getWeekNumber(workoutDate);

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = {};
      }

      // Normalize the workout type (trim spaces and convert to lowercase)
      const normalizedType = workout.sport?.trim().toLowerCase() || 'unknown';

      if (weeks[weekNumber][normalizedType]) {
        weeks[weekNumber][normalizedType] += 1;
      } else {
        weeks[weekNumber][normalizedType] = 1;
      }
    });

    return weeks;
  };

  const weeks = groupWorkoutsByWeek();
  const allWeeks = Array.from({ length: 52 }, (_, i) => i + 1); // Generate weeks from 1 to 52

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      {allWeeks.map((week) => {
        const workoutsForWeek = weeks[week] || {};
        return (
          <View key={week} style={styles.weekContainer}>
            <Text style={styles.weekTitle}>Week {week}</Text>
            {Object.entries(workoutsForWeek).length > 0 ? (
              Object.entries(workoutsForWeek).map(([sport, count]) => (
                <Text key={sport} style={styles.itemText}>{`${count}x ${sport}`}</Text>
              ))
            ) : (
              <Text style={styles.itemText}>No workouts</Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default WorkoutHistoryScreen;
