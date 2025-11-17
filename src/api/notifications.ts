    import * as Notifications from 'expo-notifications';
    import * as Device from 'expo-device';
    import { Platform } from 'react-native';
    import { api } from './client';
    import Constants from 'expo-constants';

    /* 1. Правильный тип для обработчика */
    const handler: Notifications.NotificationHandler = {
    handleNotification: async () => ({
        shouldShowAlert:  true,
        shouldPlaySound:  true,
        shouldSetBadge:   false,
        shouldShowBanner: true,   // ✅
        shouldShowList:   true,   // ✅
    }),
    };
    Notifications.setNotificationHandler(handler);

    export class NotificationService {
    /* 2. Разрешения */
    static async requestPermissions(): Promise<boolean> {
        if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        }

        if (!Device.isDevice) return false;

        const { status: existing } = await Notifications.getPermissionsAsync();
        let final = existing;
        if (existing !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        final = status;
        }
        return final === 'granted';
    }

    /* 3. Получаем push-токен (Expo) */
    static async getPushToken(): Promise<string | null> {
        const ok = await this.requestPermissions();
        if (!ok) return null;
        const { data } = await Notifications.getExpoPushTokenAsync({
        // Для новых версий SDK требуется projectId
        projectId: Constants?.expoConfig?.extra?.eas?.projectId ?? '',
        });
        console.log('📱 Push token:', data);
        return data;
    }

    /* 4. Регистрация на сервере */
    static async registerDevice(userId: string): Promise<void> {
        const pushToken = await this.getPushToken();
        if (!pushToken) return;
        await api.post('/notifications/register', {
        userId,
        pushToken,
        deviceType: Platform.OS,
        });
        console.log('✅ Устройство зарегистрировано');
    }

    /* 5. Создаём локальное уведомление */
    static async createNotification(options: {
        title: string;
        body: string;
        data?: Record<string, any>;
        delaySeconds?: number;
    }): Promise<string> {
        const trigger: Notifications.NotificationTriggerInput =
        options.delaySeconds && options.delaySeconds > 0
            ? { seconds: options.delaySeconds, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL }
            : null;

        const id = await Notifications.scheduleNotificationAsync({
        content: { title: options.title, body: options.body, data: options.data ?? {}, sound: true },
        trigger,
        });
        console.log('✅ Уведомление создано:', id);
        return id;
    }

    /* 6. Упрощённые helpers */
    static async showInstantNotification(title: string, body: string, data?: any) {
        return this.createNotification({ title, body, data, delaySeconds: 0 });
    }

    static async createReminder(r: {
        id: string;
        title: string;
        message: string;
        carId: string;
        delaySeconds: number;
    }) {
        return this.createNotification({
        title: r.title,
        body: r.message,
        data: { type: 'reminder', reminderId: r.id, carId: r.carId },
        delaySeconds: r.delaySeconds,
        });
    }

    /* 7. Отмена */
    static async cancelNotification(id: string) {
        await Notifications.cancelScheduledNotificationAsync(id);
    }

    static async cancelAllNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }
    }