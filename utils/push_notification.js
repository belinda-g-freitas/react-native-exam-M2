import PushNotification from 'react-native-push-notification';

import React, { useEffect } from 'react';

const ChallengeReminder = () => {
  useEffect(() => {
    PushNotification.requestPermissions('badge');
    // check permission
    PushNotification.checkPermissions({ badge: true });
    // Configure notification
    PushNotification.configure({
      onNotification: function (notification) {
        // Handle notification when received
        console.log('Notification received:', notification);
      },
    });
    PushNotification.localNotification({
      smallIcon: 'assets/author.jpg',
      // color?: string | undefined;
      vibrate: true,
      vibration: 1,
      priority: 'default',
      visibility: 'public',
      ignoreInForeground: false,
      // shortcutId?: string | undefined;
      // channelId?: string | undefined;
      onlyAlertOnce: true,
      allowWhileIdle: true,
      // timeoutAfter?: number | null | undefined;
      // messageId?: string | undefined;
      // when?: number | null | undefined;
      // usesChronometer?: boolean | undefined;
      // actions?: string[] | undefined;
      invokeApp: true,
      id: `${new Date()}`,
      title: 'Ahh a new day😙, so many opportunities to grab !',
      message: 'Don\'t forget your set challenges of the day!',
      // picture: string | undefined;
      // userInfo: any;
      playSound: true,
      soundName: 'assets/',
      // number: string | number | undefined;
      repeatType: 'day',
      // repeatTime: number | undefined;
    });

    // Schedule a local notification
    PushNotification.localNotificationSchedule({
      title: 'Daily challenge tracker',
      allowWhileIdle: true,
      date: new Date(Date.now() + 3 * 1000), // 3 seconds from now
    });

    return () => {
      // Clear notifications when the component unmounts
      PushNotification.cancelAllLocalNotifications();
    };
  }, []);

  return <YourComponent />;
};

export default ChallengeReminder;