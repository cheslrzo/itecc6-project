import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

const { Navigator, Screen } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

// Explicitly typing 'props' using 'DrawerContentComponentProps' from '@react-navigation/drawer'
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
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
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="index" options={{ title: "Today's Habits" }} />
      <Drawer.Screen name="myhabits" options={{ title: "My Habits" }} />
      <Drawer.Screen name="addhabits" options={{ title: "Add Habit" }} />
      <Drawer.Screen name="logcompletion" options={{ title: "Log Completion" }} />
      <Drawer.Screen name="viewstreaks" options={{ title: "View Streaks" }} />
      <Drawer.Screen name="resethabit" options={{ title: "Reset Habit" }} />
    </Drawer>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
