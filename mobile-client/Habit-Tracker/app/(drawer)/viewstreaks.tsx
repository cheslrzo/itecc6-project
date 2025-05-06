import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Habit {
  id: number;
  name: string;
  frequency: string;
  streak: number;
  longestStreak: number;
  startDate: string;
  completedToday: boolean;
}

const sampleHabits: Habit[] = [
  { id: 1, name: 'Driving', frequency: 'Daily', streak: 3, longestStreak: 6, startDate: '2025-03-15', completedToday: false },
  { id: 2, name: 'Playing Basketball', frequency: 'Weekly', streak: 2, longestStreak: 4, startDate: '2025-04-10', completedToday: true },
  { id: 3, name: 'Walking', frequency: 'Daily', streak: 0, longestStreak: 7, startDate: '2025-01-01', completedToday: false },
  { id: 4, name: 'Jogging', frequency: 'Daily', streak: 0, longestStreak: 5, startDate: '2025-02-01', completedToday: false },
  { id: 5, name: 'Cooking', frequency: 'Weekly', streak: 0, longestStreak: 3, startDate: '2025-03-01', completedToday: false },
];

export default function ViewStreaks() {
  const [filter, setFilter] = useState('All');

  const getDaysSinceStart = (startDateStr: string) => {
    const startDate = new Date(startDateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredHabits = sampleHabits.filter(
    (habit) => filter === 'All' || habit.frequency === filter
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Streaks</Text>

      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Filter by Frequency</Text>
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={filter}
            onValueChange={(value) => setFilter(value)}
            style={styles.picker}
            dropdownIconColor="#ccc"
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Daily" value="Daily" />
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="None" value="None" />
          </Picker>
        </View>
      </View>

      <ScrollView style={styles.habitList}>
        {filteredHabits.map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.cardRow}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.streakSummary}>
                {habit.streak}-day streak
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2230',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    alignSelf: 'center',
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownLabel: {
    color: 'white',
    marginBottom: 4,
    fontSize: 14,
  },
  dropdownWrapper: {
    backgroundColor: '#2e3548',
    borderRadius: 6,
  },
  picker: {
    height: 50,
    color: '#ccc',
  },
  habitList: {
    marginTop: 8,
  },
  habitCard: {
    backgroundColor: '#2e3548',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  habitName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  streakSummary: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
});
