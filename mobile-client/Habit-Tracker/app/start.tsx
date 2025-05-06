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
      <View style={styles.content}>
        <Text style={styles.title}>Build Better Habits,</Text>
        <Text style={styles.subtitle}>Build a Better Life</Text>

        <View style={styles.spacer} />

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
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  spacer: {
    height: 60,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
