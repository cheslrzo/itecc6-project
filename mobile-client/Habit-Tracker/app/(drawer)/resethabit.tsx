import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function ResetHabit() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Habit</Text>

      </View>
      
      <View style={styles.content}>
        <Text style={styles.message}>Your Reset Habit will be displayed here</Text>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#666',
  },
});