{/*
    import * as Notifications from 'expo-notifications';
    import * as Device from 'expo-device';
    import { Platform } from 'react-native';

    Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    } as any),
    });

    export class NotificationService {
    static async requestPermissions(): Promise<boolean> {
        if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        }

        if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        
        return finalStatus === 'granted';
        }
        
        return false;
    }

    static async getPushToken(): Promise<string | null> {
        try {
        const hasPermission = await this.requestPermissions();
        if (!hasPermission) {
            console.log('❌ Нет разрешений на уведомления');
            return null;
        }

        const token = await Notifications.getExpoPushTokenAsync();
        console.log('📱 Push токен:', token.data);
        return token.data;
        } catch (error) {
        console.error('❌ Ошибка получения push-токена:', error);
        return null;
        }
    }

    static async createNotification(options: {
        title: string;
        body: string;
        data?: any;
        delaySeconds?: number;
    }): Promise<string> {
        try {
        let trigger = null;
        
        if (options.delaySeconds && options.delaySeconds > 0) {
            trigger = {
            seconds: options.delaySeconds,
            };
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
            title: options.title,
            body: options.body,
            data: options.data || {},
            sound: true,
            },
            trigger: trigger as any,
        });
        
        console.log('✅ Уведомление создано с ID:', notificationId);
        return notificationId;
        } catch (error) {
        console.error('❌ Ошибка создания уведомления:', error);
        throw error;
        }
    }

    static async createReminder(reminder: {
        id: string;
        title: string;
        message: string;
        carId: string;
        delaySeconds: number;
    }): Promise<string> {
        return await this.createNotification({
        title: reminder.title,
        body: reminder.message,
        data: {
            type: 'reminder',
            reminderId: reminder.id,
            carId: reminder.carId,
        },
        delaySeconds: reminder.delaySeconds,
        });
    }

    static async showInstantNotification(title: string, body: string, data?: any): Promise<string> {
        return await this.createNotification({
        title,
        body,
        data,
        delaySeconds: 0,
        });
    }

    static async cancelNotification(notificationId: string): Promise<void> {
        try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        console.log('✅ Уведомление отменено:', notificationId);
        } catch (error) {
        console.error('❌ Ошибка отмены уведомления:', error);
        }
    }

    static async cancelAllNotifications(): Promise<void> {
        try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('✅ Все уведомления отменены');
        } catch (error) {
        console.error('❌ Ошибка отмены всех уведомлений:', error);
        }
    }
   } 
*/}