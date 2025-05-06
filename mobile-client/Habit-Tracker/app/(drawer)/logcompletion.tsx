import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Habit {
  id: number;
  name: string;
  frequency: string;
  streak: number;
  completedToday: boolean;
  lastCompleted?: string;
}

const sampleHabits: Habit[] = [
  { id: 1, name: 'Morning Meditation', frequency: 'Daily', streak: 5, completedToday: false },
  { id: 2, name: 'Read for 30 minutes', frequency: 'Daily', streak: 12, completedToday: true, lastCompleted: new Date().toISOString() },
  { id: 3, name: 'Drink 8 glasses of water', frequency: 'Daily', streak: 3, completedToday: false },
  { id: 4, name: 'Exercise', frequency: 'Mon, Wed, Fri', streak: 7, completedToday: false },
  { id: 5, name: 'Call parents', frequency: 'Weekly', streak: 2, completedToday: false },
];

export default function LogCompletion() {
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  const handleLogCompletion = (habitId: number) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isCompleting = !habit.completedToday;
          return {
            ...habit,
            completedToday: isCompleting,
            streak: isCompleting ? habit.streak + 1 : habit.streak,
            lastCompleted: isCompleting ? new Date().toISOString() : habit.lastCompleted,
          };
        }
        return habit;
      })
    );

    const habit = habits.find(h => h.id === habitId);
    const isCompleting = !habit?.completedToday;

    Alert.alert(
      isCompleting ? 'Habit Completed!' : 'Completion Removed',
      isCompleting
        ? `Great job completing "${habit?.name}"!`
        : `Removed completion for "${habit?.name}".`
    );
  };

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Log Completion</Text>
      <Text style={styles.pageSubtitle}>Select Habit</Text>

      <Picker
        selectedValue={selectedHabitId}
        style={styles.picker}
        dropdownIconColor="#cbd5e1"
        onValueChange={(itemValue) => setSelectedHabitId(itemValue)}
      >
        <Picker.Item label="-- Choose a habit --" value={null} />
        {habits.map(habit => (
          <Picker.Item label={habit.name} value={habit.id} key={habit.id} />
        ))}
      </Picker>

      {selectedHabit && (
        <View style={styles.card}>
          <Text style={styles.habitName}>{selectedHabit.name}</Text>
          <Text style={styles.habitDetail}>Frequency: {selectedHabit.frequency}</Text>
          <Text style={styles.habitDetail}>Streak: {selectedHabit.streak} days</Text>
          {selectedHabit.completedToday && (
            <Text style={styles.completedText}>✓ Marked as Completed Today</Text>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectedHabitId(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.logButton,
                selectedHabit.completedToday && styles.logButtonDisabled,
              ]}
              onPress={() => handleLogCompletion(selectedHabit.id)}
            >
              <Text style={styles.logButtonText}>Yes, Log It</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b', // slate-800
    padding: 20,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 8,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  habitDetail: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 4,
  },
  completedText: {
    fontSize: 14,
    marginTop: 4,
    color: '#22c55e',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    backgroundColor: '#475569',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  logButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  logButtonDisabled: {
    backgroundColor: '#1d4ed8',
  },
  logButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
