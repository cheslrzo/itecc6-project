import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

interface Habit {
  id: number;
  name: string;
  frequency: string;
  streak: number;
  goal: string;
}

const sampleHabits: Habit[] = [
  { id: 1, name: 'Walking', frequency: 'Daily', streak: 0, goal: '7 days' },
  { id: 2, name: 'Playing Basketball', frequency: 'Daily', streak: 2, goal: '12 days' },
  { id: 3, name: 'Jogging', frequency: 'Daily', streak: 0, goal: '20 days' },
  { id: 4, name: 'Driving', frequency: 'Monthly', streak: 3, goal: '12 days' },
  { id: 5, name: 'Cooking', frequency: 'Weekly', streak: 0, goal: '15 days' },
];

export default function MyHabits() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitName, setHabitName] = useState('');
  const [habitFrequency, setHabitFrequency] = useState('');
  const [habitGoal, setHabitGoal] = useState('');

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setHabitName(habit.name);
    setHabitFrequency(habit.frequency);
    setHabitGoal(habit.goal);
    setModalVisible(true);
  };

  const handleDeleteHabit = (habitId: number) => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Habit Deleted', `Habit with ID: ${habitId} has been deleted.`);
        },
      },
    ]);
  };

  const handleSaveHabit = () => {
    if (!habitName.trim()) {
      Alert.alert('Validation', 'Please enter a habit name.');
      return;
    }
    Alert.alert('Success', editingHabit ? `Habit updated!` : `New habit added!`);
    setHabitName('');
    setHabitFrequency('');
    setHabitGoal('');
    setEditingHabit(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>My Habits</Text>
        <TouchableOpacity
          onPress={() => {
            setEditingHabit(null);
            setHabitName('');
            setHabitFrequency('');
            setHabitGoal('');
            setModalVisible(true);
          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Add Habit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.column, { flex: 2 }]}>Habit</Text>
        <Text style={styles.column}>Streak</Text>
        <Text style={styles.column}>Frequency</Text>
        <Text style={styles.column}>Goal</Text>
        <Text style={styles.column}>Action</Text>
      </View>

      <ScrollView>
        {sampleHabits.map((habit) => (
          <View key={habit.id} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 2 }]}>{habit.name}</Text>
            <Text style={styles.cell}>{habit.streak}</Text>
            <Text style={styles.cell}>{habit.frequency}</Text>
            <Text style={styles.cell}>{habit.goal}</Text>
            <View style={styles.actionCell}>
              <TouchableOpacity onPress={() => handleEditHabit(habit)}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteHabit(habit.id)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingHabit ? 'Edit Habit' : 'Add Habit'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Habit name"
              value={habitName}
              onChangeText={setHabitName}
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency (e.g. Daily)"
              value={habitFrequency}
              onChangeText={setHabitFrequency}
            />
            <TextInput
              style={styles.input}
              placeholder="Goal (e.g. 7 days)"
              value={habitGoal}
              onChangeText={setHabitGoal}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveHabit}>
                <Text style={styles.modalButtonText}>
                  {editingHabit ? 'Save' : 'Add'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setEditingHabit(null);
                  setHabitName('');
                  setHabitFrequency('');
                  setHabitGoal('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#1e293b',
    borderBottomWidth: 1,
  },
  column: {
    flex: 1,
    color: '#94a3b8',
    fontWeight: '600',
  },
  cell: {
    flex: 1,
    color: 'white',
  },
  actionCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  editIcon: {
    fontSize: 18,
    color: '#facc15',
  },
  deleteIcon: {
    fontSize: 18,
    color: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
