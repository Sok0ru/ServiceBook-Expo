    import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
    import { Alert } from 'react-native';
    import * as Notifications from 'expo-notifications';
    import { NotificationService } from '../services/notificationService';

    interface SimpleNotificationContext {
    hasPermission: boolean;
    requestPermission: () => Promise<boolean>;
    showNotification: (title: string, body: string, data?: any) => Promise<void>;
    scheduleReminder: (options: {
        id: string;
        title: string;
        message: string;
        carId: string;
        delaySeconds: number;
    }) => Promise<void>;
    }

    const NotificationContext = createContext<SimpleNotificationContext | undefined>(undefined);

    export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener = useRef<Notifications.Subscription | null>(null);

    useEffect(() => {
        checkPermissions();
        setupNotificationListeners();
        return () => {
        notificationListener.current?.remove();
        responseListener.current?.remove();
        };
    }, []);

    const checkPermissions = async () => {
        const permission = await NotificationService.requestPermissions();
        setHasPermission(permission);
    };

    const setupNotificationListeners = () => {
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        console.log('📨 Уведомление получено:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('👆 Пользователь нажал на уведомление:', response);
        const data = response.notification.request.content.data;
        if (data.type === 'reminder') {
            Alert.alert('Напоминание', `Переход к напоминанию: ${data.reminderId}`);
        }
        });
    };

    const requestPermission = async (): Promise<boolean> => {
        const permission = await NotificationService.requestPermissions();
        setHasPermission(permission);
        return permission;
    };

    const showNotification = async (title: string, body: string, data?: any): Promise<void> => {
        if (!hasPermission) {
        Alert.alert('Ошибка', 'Нет разрешений на уведомления');
        return;
        }
        await NotificationService.showInstantNotification(title, body, data);
    };

    const scheduleReminder = async (options: {
        id: string;
        title: string;
        message: string;
        carId: string;
        delaySeconds: number;
    }): Promise<void> => {
        if (!hasPermission) {
        Alert.alert('Ошибка', 'Нет разрешений на уведомления');
        return;
        }
        await NotificationService.createReminder(options);
        Alert.alert('Успех', `Напоминание создано на ${options.delaySeconds} секунд`);
    };

    const value: SimpleNotificationContext = {
        hasPermission,
        requestPermission,
        showNotification,
        scheduleReminder,
    };

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
    };

    export const useNotification = (): SimpleNotificationContext => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
    };