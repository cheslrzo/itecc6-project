import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native'; // Import ScrollView here
import { useRouter } from 'expo-router'; // To navigate

const sampleHabits = [
  { id: 1, name: 'Morning Meditation', streak: 5, completedToday: false },
  { id: 2, name: 'Read for 30 minutes', streak: 12, completedToday: true },
  { id: 3, name: 'Drink 8 glasses of water', streak: 3, completedToday: false },
  { id: 4, name: 'Exercise', streak: 7, completedToday: false },
];

export default function MainScreen() {
  const [habitName, setHabitName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddHabit = () => {
    if (habitName.trim() === '') {
      Alert.alert('Validation', 'Please enter a habit name.');
      return;
    }
    // Ideally, save habit to backend or global state
    Alert.alert('Success', `Habit "${habitName}" added!`);
    setHabitName(''); // Clear input field
    setModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Habits</Text>
      </View>

      <ScrollView style={styles.habitList}>
        {sampleHabits.map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.streakText}>🔥 {habit.streak} day streak</Text>
            </View>
            <TouchableOpacity
              style={[styles.completeButton, habit.completedToday ? styles.completedButton : {}]}
            >
              <Text style={styles.completeButtonText}>
                {habit.completedToday ? '✓ Done' : 'Complete'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)} // Open modal on button click
      >
        <Text style={styles.addButtonText}>+ Add New Habit</Text>
      </TouchableOpacity>

      {/* Add Habit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Habit</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter habit name"
              value={habitName}
              onChangeText={setHabitName}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddHabit}>
                <Text style={styles.modalButtonText}>Add Habit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
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
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  habitList: { marginTop: 16 },
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
  habitInfo: { flex: 1 },
  habitName: { fontSize: 18, fontWeight: '600' },
  streakText: { marginTop: 4, color: '#666' },
  completeButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  completedButton: { backgroundColor: '#4CAF50' },
  completeButtonText: { fontWeight: '600' },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%', // Make buttons full width
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
