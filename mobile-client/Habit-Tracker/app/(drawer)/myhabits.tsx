import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';

// Define the Habit type
interface Habit {
  id: number;
  name: string;
  frequency: string;
  streak: number;
}

// Sample habits data
const sampleHabits: Habit[] = [
  { id: 1, name: 'Morning Meditation', frequency: 'Daily', streak: 5 },
  { id: 2, name: 'Read for 30 minutes', frequency: 'Daily', streak: 12 },
  { id: 3, name: 'Drink 8 glasses of water', frequency: 'Daily', streak: 3 },
  { id: 4, name: 'Exercise', frequency: 'Mon, Wed, Fri', streak: 7 },
  { id: 5, name: 'Call parents', frequency: 'Weekly', streak: 2 },
];

export default function MyHabits() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitName, setHabitName] = useState('');

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setHabitName(habit.name);
    setModalVisible(true);
  };

  const handleDeleteHabit = (habitId: number) => {
    Alert.alert('Delete Habit', 'Are you sure you want to delete this habit?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          Alert.alert('Habit Deleted', `Habit with ID: ${habitId} has been deleted.`);
        },
      },
    ]);
  };

  const handleSaveHabit = () => {
    if (habitName.trim() === '') {
      Alert.alert('Validation', 'Please enter a habit name.');
      return;
    }
    if (editingHabit) {
      Alert.alert('Success', `Habit "${habitName}" updated!`);
    } else {
      Alert.alert('Success', `New habit "${habitName}" added!`);
    }
    setHabitName('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Habits</Text>
      </View>

      <ScrollView style={styles.habitList}>
        {sampleHabits.map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.habitFrequency}>Frequency: {habit.frequency}</Text>
            <Text style={styles.streakText}>Current streak: {habit.streak} days</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditHabit(habit)}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteHabit(habit.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add New Habit</Text>
      </TouchableOpacity>

      {/* Modal for Add/Edit Habit */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingHabit ? 'Edit Habit' : 'Add New Habit'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter habit name"
              value={habitName}
              onChangeText={setHabitName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveHabit}>
                <Text style={styles.modalButtonText}>
                  {editingHabit ? 'Save Changes' : 'Add Habit'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
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
  habitList: {
    marginTop: 16,
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
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  habitFrequency: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  streakText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
