import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

const { Navigator, Screen } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

// Explicitly typing 'props' using 'DrawerContentComponentProps'
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: '#0C1424' }} // drawer background
    >
      {/* Title for the Drawer */}
      <View style={styles.header}>
        
        <Text style={styles.title}>Habit Tracker</Text>
      </View>

      {/* Drawer items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#111827', // Dark blue header color to match the web app
        },
        headerTintColor: '#fff', // White text for the header
        drawerStyle: {
          backgroundColor: '#0C1424',
        },
        
        drawerLabelStyle: {
          color: '#FFFFFF', // white text
        },
        drawerActiveTintColor: '#FFFFFF', // active label color
        drawerActiveBackgroundColor: '#2563EB', // active item bg
        drawerInactiveTintColor: '#9CA3AF', // gray for inactive items
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="myhabits" options={{ title: 'My Habits' }} />
      <Drawer.Screen name="addhabits" options={{ title: 'Add Habit' }} />
      <Drawer.Screen name="logcompletion" options={{ title: 'Log Completion' }} />
      <Drawer.Screen name="viewstreaks" options={{ title: 'View Streaks' }} />
      <Drawer.Screen name="resethabit" options={{ title: 'Reset Habit' }} />
    </Drawer>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937', // darker divider
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6', // bright blue text
  },
});
