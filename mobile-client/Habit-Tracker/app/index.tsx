import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/start');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 10 }}>Habit Tracker</Text>
    </View>
  );
}
