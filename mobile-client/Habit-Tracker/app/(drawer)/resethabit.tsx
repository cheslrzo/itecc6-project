import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const habits = ['Driving', 'Playing Basketball', 'Walking', 'Jogging', 'Cooking'];

export default function ResetHabitScreen() {
  const [selectedHabit, setSelectedHabit] = useState('');

  const handleCancel = () => {
    setSelectedHabit('');
  };

  const handleReset = () => {
    // Add logic here for resetting the habit
    console.log(`Resetting habit: ${selectedHabit}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Habit</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Habit:</Text>

        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedHabit}
            style={styles.picker}
            dropdownIconColor="#ccc"
            onValueChange={(itemValue) => setSelectedHabit(itemValue)}
          >
            <Picker.Item label="Select a habit" value="" />
            {habits.map((habit) => (
              <Picker.Item key={habit} label={habit} value={habit} />
            ))}
          </Picker>
        </View>

        {selectedHabit !== '' && (
          <Text style={styles.warning}>
            Are you sure you want to reset this habit? This will erase the current streak.
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.yesButton,
              selectedHabit === '' && styles.disabledButton,
            ]}
            onPress={handleReset}
            disabled={selectedHabit === ''}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2230',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#2e3548',
    padding: 24,
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#444b5c',
    borderRadius: 6,
    marginBottom: 16,
  },
  picker: {
    color: '#ccc',
    height: 50,
  },
  warning: {
    color: 'red',
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  yesButton: {
    backgroundColor: '#d32f2f',
  },
  cancelButton: {
    backgroundColor: '#607d8b',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'white',
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#a5a5a5',
  },
});
