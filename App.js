import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
// import NotificationScreen from './NotificationScreen';
import HistoryScreen from './HistoryScreen';
import PushNotification from 'react-native-push-notification';
import { useEffect } from 'react';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // useEffect(() => {
  //   // Configure notification
  //   PushNotification.configure({
  //     requestPermissions: true, 
  //     permissions: { badge: true, sound: true, alert: true },

  //     onNotification: function (notification) {
  //       // Handle notification when received
  //       console.log('Notification received:', notification);
  //     },
  //   });
  //   PushNotification.localNotification({
  //     smallIcon: 'assets/author.jpg',
  //     vibrate: true,
  //     priority: 'default',
  //     visibility: 'public',
  //     ignoreInForeground: false,
  //     onlyAlertOnce: true,
  //     allowWhileIdle: true,
  //     invokeApp: true,
  //     id: `${new Date()}`,
  //     title: 'Ahh a new day😙, so many opportunities to grab !',
  //     message: 'Don\'t forget your set challenges of the day!',
  //     picture: 'assets/author.jpg',
  //     repeatType: 'day',
  //   });

  //   // Schedule a local notification
  //   PushNotification.localNotificationSchedule({
  //     title: 'Daily challenge tracker',
  //     allowWhileIdle: true,
  //     date: new Date(Date.now() + 3 * 1000), // 3 seconds from now
  //   });

  //   return () => {
  //     // Clear notifications when the component unmounts
  //     PushNotification.cancelAllLocalNotifications();
  //   };
  // }, []);

  return (
    <NavigationContainer >
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen} options={tabOption} />
        {/* <Tab.Screen name='Notification' component={NotificationScreen} options={tabOption} /> */}
        <Tab.Screen name='History' component={HistoryScreen} options={tabOption} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const tabOption = { headerTitle: 'Daily challenge tracker', headerStyle: { backgroundColor: '#673AB7' }, headerTintColor: '#fff', tabBarInactiveBackgroundColor: '#673AB7', tabBarActiveTintColor: '#4A148C', tabBarLabelStyle: { fontSize: 15, fontWeight: '700' }, tabBarLabelPosition: 'beside-icon', tabBarIcon: (() => { false; 0 }) };

// const HomeNavigation = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Home' component={HomeScreen} /* options={{ headerTitle: 'Daily challenge tracker', headerStyle: { backgroundColor: '#673AB7' }, headerTintColor: '#fff' }} */ />
//       {/* <Stack.Screen name='Notification' component={NotificationScreen} />
//       <Stack.Screen name='History' component={HistoryScreen} /> */}
//     </Stack.Navigator>
//   );
// }
