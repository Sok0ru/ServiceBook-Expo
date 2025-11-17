    // src/screens/TestNotificationsScreen.tsx
    import React from 'react';
    import { View, Button, StyleSheet, ScrollView } from 'react-native';
    import { NotificationService } from '../../services/notificationService';

    export default function TestNotificationsScreen() {
    /* мгновенное */
    const sendInstant = () =>
        NotificationService.showInstantNotification('🔔 Instant', 'Сработало сразу!');

    /* через 5 секунд */
    const sendDelayed = () =>
        NotificationService.createNotification({
        title: '⏱ Отложено',
        body: 'Прошло 5 секунд',
        delaySeconds: 5,
        });

    /* точная дата (через 15 сек) */
    const sendDate = () => {
        const future = new Date(Date.now() + 15_000);
        NotificationService.scheduleDate('📅 По дате', '15 сек прошло', future);
    };

    /* ежедневное в 09:00 */
    const sendDaily = () =>
        NotificationService.daily('📆 Ежедневное', 'Каждый день в 09:00', 9, 0);

    /* отмена всего */
    const cancelAll = () => NotificationService.cancelAllNotifications();

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Button title="🔴 Мгновенно" onPress={sendInstant} />
        <Button title="🟠 Через 5 сек" onPress={sendDelayed} />
        <Button title="🟡 По точной дате (+15с)" onPress={sendDate} />
        <Button title="🟢 Ежедневное 09:00" onPress={sendDaily} />
        <View style={styles.spacer} />
        <Button title="❌ Отменить всё" onPress={cancelAll} color="#c00" />
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, gap: 12 },
    spacer: { height: 20 },
    });