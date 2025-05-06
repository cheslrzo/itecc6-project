import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

// Define the Habit type
interface Habit {
  id: number;
  name: string;
  frequency: string;
  streak: number;
  completedToday: boolean;
  lastCompleted?: string;
}

// Sample habits data
const sampleHabits: Habit[] = [
  { id: 1, name: 'Morning Meditation', frequency: 'Daily', streak: 5, completedToday: false },
  { id: 2, name: 'Read for 30 minutes', frequency: 'Daily', streak: 12, completedToday: true, lastCompleted: new Date().toISOString() },
  { id: 3, name: 'Drink 8 glasses of water', frequency: 'Daily', streak: 3, completedToday: false },
  { id: 4, name: 'Exercise', frequency: 'Mon, Wed, Fri', streak: 7, completedToday: false },
  { id: 5, name: 'Call parents', frequency: 'Weekly', streak: 2, completedToday: false },
];

export default function LogCompletion() {
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);

  const handleLogCompletion = (habitId: number) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isCompleting = !habit.completedToday;
          // If completing, update streak and last completed date
          // If un-completing, just toggle the completedToday status
          return {
            ...habit,
            completedToday: isCompleting,
            streak: isCompleting ? habit.streak + (habit.completedToday ? 0 : 1) : habit.streak,
            lastCompleted: isCompleting ? new Date().toISOString() : habit.lastCompleted
          };
        }
        return habit;
      })
    );

    // Show confirmation
    const habit = habits.find(h => h.id === habitId);
    const isCompleting = !habit?.completedToday;
    
    Alert.alert(
      isCompleting ? 'Habit Completed!' : 'Completion Removed',
      isCompleting 
        ? `Great job completing "${habit?.name}"! Your streak is now ${(habit?.streak || 0) + 1}.`
        : `Removed completion for "${habit?.name}".`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Log Completion</Text>
      </View>
      
      <Text style={styles.subtitle}>Track your daily progress by logging your completed habits:</Text>
      
      <ScrollView style={styles.habitList}>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.habitFrequency}>Frequency: {habit.frequency}</Text>
              <Text style={styles.streakText}>Current streak: {habit.streak} days</Text>
              {habit.completedToday && (
                <Text style={styles.completedText}>
                  ✓ Completed {habit.lastCompleted ? new Date(habit.lastCompleted).toLocaleDateString() : 'today'}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={[styles.logButton, habit.completedToday ? styles.completedButton : {}]}
              onPress={() => handleLogCompletion(habit.id)}
            >
              <Text style={styles.logButtonText}>
                {habit.completedToday ? 'Undo' : 'Complete'}
              </Text>
            </TouchableOpacity>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  habitList: {
    marginTop: 16,
  },
  habitCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  habitFrequency: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  streakText: {
    fontSize: 14,
    color: '#666',
  },
  completedText: {
    marginTop: 4,
    color: '#4CAF50',
    fontWeight: '600',
  },
  logButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  logButtonText: {
    fontWeight: '600',
    color: '#333',
  },
});