import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  const totalHabits = 6;
  const longestStreak = 3;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.subHeader}>Overview</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Habits</Text>
          <Text style={styles.cardValue}>{totalHabits}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Longest Streak</Text>
          <Text style={[styles.cardValue, { color: '#6EE7B7' }]}>{longestStreak} Days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', 
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    color: '#cbd5e1', 
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    backgroundColor: '#1e293b', 
    borderRadius: 12,
    padding: 20,
    flex: 1,
  },
  cardLabel: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
