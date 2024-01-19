import { registerRootComponent } from 'expo';

import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import {Linking} from 'react-native'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
async function createChannel() {
    await notifee.createChannel({
        id: 'som',
        name: 'som',
        sound: 'alerta',
    })

    
    await notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;
        if (type === EventType.ACTION_PRESS && pressAction.id === 'snooze') {
            notifee.hideNotificationDrawer()
            Linking.openURL(`tel:190`)
        }
    });
}

createChannel()
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await notifee.displayNotification({
        body: `Novo alerta de ${remoteMessage.data.email}`,
        android: {
            channelId: 'som',
            sound: 'alerta',
            pressAction: {
                launchActivity: 'com.baresosapp.MainActivity',
                id: "default",
            },
            actions: [
                {
                    title: 'Ligar para policia',
                    pressAction: {
                        id: 'snooze',
                    }
                }
            ]
        },
    })
    
});

registerRootComponent(App);
