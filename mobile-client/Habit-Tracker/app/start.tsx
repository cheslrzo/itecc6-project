import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Start() {
  const router = useRouter();

  const goToMain = () => {
    router.push('/(drawer)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Habit Tracker</Text>
        <Text style={styles.title}>Build Better Habits,</Text>
        <Text style={styles.title}>Build a Better Life</Text>

        <TouchableOpacity style={styles.button} onPress={goToMain}>
          <Text style={styles.buttonText}>Start Daily Habits</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1120', // very dark blue background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1e293b', // dark slate blue card
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10, // Android shadow
  },
  header: {
    fontSize: 14,
    color: '#cbd5e1', // slate-300
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#2563eb', // blue-600
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9999,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
