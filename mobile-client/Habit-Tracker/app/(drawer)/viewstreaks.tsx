import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Define the Habit type
interface Habit {
  id: number;
  name: string;
  frequency: string;
  streak: number;
  longestStreak: number;
  startDate: string;
  completedToday: boolean;
}

// Sample habits data with additional streak information
const sampleHabits: Habit[] = [
  { id: 1, name: 'Morning Meditation', frequency: 'Daily', streak: 5, longestStreak: 14, startDate: '2025-03-15', completedToday: false },
  { id: 2, name: 'Read for 30 minutes', frequency: 'Daily', streak: 12, longestStreak: 12, startDate: '2025-04-10', completedToday: true },
  { id: 3, name: 'Drink 8 glasses of water', frequency: 'Daily', streak: 3, longestStreak: 21, startDate: '2025-02-01', completedToday: false },
  { id: 4, name: 'Exercise', frequency: 'Mon, Wed, Fri', streak: 7, longestStreak: 10, startDate: '2025-03-20', completedToday: false },
  { id: 5, name: 'Call parents', frequency: 'Weekly', streak: 2, longestStreak: 8, startDate: '2025-01-12', completedToday: false },
];

export default function ViewStreaks() {
  const [sortMethod, setSortMethod] = useState<'current' | 'longest'>('current');
  
  // Sort habits based on current sort method
  const sortedHabits = [...sampleHabits].sort((a, b) => {
    if (sortMethod === 'current') {
      return b.streak - a.streak;
    } else {
      return b.longestStreak - a.longestStreak;
    }
  });

  // Calculate days since habit started
  const getDaysSinceStart = (startDateStr: string) => {
    const startDate = new Date(startDateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>View Streaks</Text>
      </View>
      
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.sortButton, sortMethod === 'current' ? styles.activeButton : {}]}
            onPress={() => setSortMethod('current')}
          >
            <Text style={[styles.sortButtonText, sortMethod === 'current' ? styles.activeButtonText : {}]}>
              Current Streak
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortButton, sortMethod === 'longest' ? styles.activeButton : {}]}
            onPress={() => setSortMethod('longest')}
          >
            <Text style={[styles.sortButtonText, sortMethod === 'longest' ? styles.activeButtonText : {}]}>
              Longest Streak
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.habitList}>
        {sortedHabits.map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <View style={styles.streakInfo}>
              <View style={styles.streakItem}>
                <Text style={styles.streakValue}>{habit.streak}</Text>
                <Text style={styles.streakLabel}>Current Streak</Text>
              </View>
              <View style={styles.streakItem}>
                <Text style={styles.streakValue}>{habit.longestStreak}</Text>
                <Text style={styles.streakLabel}>Longest Streak</Text>
              </View>
              <View style={styles.streakItem}>
                <Text style={styles.streakValue}>{getDaysSinceStart(habit.startDate)}</Text>
                <Text style={styles.streakLabel}>Days Tracked</Text>
              </View>
            </View>
            <Text style={styles.streakDetails}>
              Started tracking on {new Date(habit.startDate).toLocaleDateString()}
            </Text>
            {habit.completedToday && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Completed Today</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  sortButtonText: {
    fontWeight: '500',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  activeButtonText: {
    color: 'white',
  },
  habitList: {
    marginTop: 8,
  },
  habitCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  streakInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  streakItem: {
    alignItems: 'center',
    flex: 1,
  },
  streakValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  streakLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  streakDetails: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  completedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});