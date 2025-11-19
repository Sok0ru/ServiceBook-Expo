    // src/contexts/NotificationContext.tsx
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
    cancelReminder: (notificationId: string) => Promise<void>;
    }

    const NotificationContext = createContext<SimpleNotificationContext | undefined>(undefined);

    export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener     = useRef<Notifications.Subscription | null>(null);

    useEffect(() => {
        checkPermissions();
        setupNotificationListeners();

        return () => {
        if (notificationListener.current) {
            notificationListener.current.remove();
        }
        if (responseListener.current) {
            responseListener.current.remove();
        }
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
        handleNotificationClick(response);
        });
    };

    const handleNotificationClick = (response: any) => {
        const data = response.notification.request.content.data;
        
        switch (data.type) {
        case 'reminder':
            Alert.alert('Напоминание', `Переход к напоминанию: ${data.reminderId}`);
            break;
        default:
            console.log('Уведомление кликнуто:', data);
        }
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

        try {
        await NotificationService.showInstantNotification(title, body, data);
        } catch (error) {
        console.error('Ошибка показа уведомления:', error);
        Alert.alert('Ошибка', 'Не удалось показать уведомление');
        }
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

        try {
        await NotificationService.createReminder(options);
        } catch (error) {
        console.error('Ошибка создания напоминания:', error);
        Alert.alert('Ошибка', 'Не удалось создать напоминание');
        }
    };

    const cancelReminder = async (notificationId: string): Promise<void> => {
        try {
        await NotificationService.cancelNotification(notificationId);
        console.log('✅ Уведомление отменено:', notificationId);
        } catch (error) {
        console.error('❌ Ошибка отмены уведомления:', error);
        }
    };

    const value: SimpleNotificationContext = {
        hasPermission,
        requestPermission,
        showNotification,
        scheduleReminder,
        cancelReminder,
    };

    return (
        <NotificationContext.Provider value={value}>
        {children}
        </NotificationContext.Provider>
    );
    };

    export const useNotification = (): SimpleNotificationContext => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
    };