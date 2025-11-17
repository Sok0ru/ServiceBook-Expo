    // src/services/notificationService.ts
    import * as Notifications from 'expo-notifications';
    import * as Device from 'expo-device';
    import { Platform } from 'react-native';
    import Constants from 'expo-constants';
    import { api } from '../api/client';

    /* 1. Обработчик – строго по типу */
    const handler: Notifications.NotificationHandler = {
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
    };
    Notifications.setNotificationHandler(handler);

    export class NotificationService {
    static createReminder(options: { id: string; title: string; message: string; carId: string; delaySeconds: number; }) {
        throw new Error('Method not implemented.');
    }
    static cancelAllNotifications() {
        throw new Error('Method not implemented.');
    }
    static createNotification(arg0: { title: string; body: string; delaySeconds: number; }) {
        throw new Error('Method not implemented.');
    }
    static async showInstantNotification(title: string, body: string, data?: Record<string, any>): Promise<string> {
    return this.schedule(
        { title, body, data: data ?? {}, sound: true },
        null,
    );
    }
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

        if (!Device.isDevice) {
        console.warn('Уведомления доступны только на реальном устройстве');
        return false;
        }

        const { status: existing } = await Notifications.getPermissionsAsync();
        let final = existing;
        if (existing !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        final = status;
        }
        return final === 'granted';
    }

    /* 3. Expo-push-токен */
    static async getPushToken(): Promise<string | null> {
        const ok = await this.requestPermissions();
        if (!ok) return null;

        const { data } = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId ?? '',
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

    /* 5. Универсальный метод – любой триггер */
        private static async schedule(
        content: Notifications.NotificationContentInput,
        trigger: Notifications.NotificationTriggerInput | null,
        ): Promise<string> {
        const identifier = `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        return Notifications.scheduleNotificationAsync({ identifier, content, trigger });
        }

    /* 6. Мгновенное уведомление */
    static async showInstant(title: string, body: string, data?: Record<string, any>): Promise<string> {
        return this.schedule(
        { title, body, data: data ?? {}, sound: true },
        null,
        );
    }

    /* 7. Напоминание «в точную дату» */
    static async scheduleDate(
        title: string,
        body: string,
        date: Date,
        data?: Record<string, any>,
    ): Promise<string> {
        if (date <= new Date()) throw new Error('Дата должна быть в будущем');

        const trigger: Notifications.DateTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        };
        return this.schedule({ title, body, data: data ?? {}, sound: true }, trigger);
    }

    /* 8. Напоминание через N секунд */
    static async delaySeconds(title: string, body: string, seconds: number, data?: Record<string, any>): Promise<string> {
        const trigger: Notifications.TimeIntervalTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
        repeats: false,
        };
        return this.schedule({ title, body, data: data ?? {}, sound: true }, trigger);
    }

    /* 9. Ежедневное в указанное время */
    static async daily(
        title: string,
        body: string,
        hour: number,
        minute: number,
        data?: Record<string, any>,
    ): Promise<string> {
        const trigger: Notifications.DailyTriggerInput = {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        };
        return this.schedule({ title, body, data: data ?? {}, sound: true }, trigger);
    }

    /* 10. Отмена */
    static async cancel(id: string): Promise<void> {
        await Notifications.cancelScheduledNotificationAsync(id);
    }

    static async cancelAll(): Promise<void> {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }
    }