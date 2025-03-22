import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockWorkouts = [
  { id: '1', type: 'Running', date: '2025-03-01' },
  { id: '2', type: 'Swimming', date: '2025-03-05' },
  { id: '3', type: 'Cycling', date: '2025-03-10' },
];

const WorkoutHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      <FlatList
        data={mockWorkouts}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.type} - {item.date}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default WorkoutHistoryScreen;
