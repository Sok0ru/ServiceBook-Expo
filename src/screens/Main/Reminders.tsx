    import React, { useState, useEffect } from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Alert,
    ActivityIndicator,
    RefreshControl,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';
    import { remindersAPI } from '../../api/reminders';
    import { useNotification } from '../../contexts/NotificationContext';
    import { Reminder } from '../../api/reminders';
    

    type RemindersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reminders'>;
    type RemindersRouteProp = RouteProp<RootStackParamList, 'Reminders'>;

    export default function Reminders() {
    const navigation = useNavigation<RemindersScreenNavigationProp>();
    const route = useRoute<RemindersRouteProp>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const { scheduleReminder, cancelReminder } = useNotification();

    const carId = route.params?.carId || 'default-car-id';
    
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadReminders = async () => {
        try {
        console.log('🔄 Загружаю напоминания для carId:', carId);
        const remindersData = await remindersAPI.getByCar(carId);
        console.log('✅ Получены напоминания:', remindersData);
        setReminders(remindersData);
        } catch (error: any) {
        console.error('❌ Ошибка загрузки напоминаний:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить напоминания');
        } finally {
        setLoading(false);
        setRefreshing(false);
        }
    };

    useEffect(() => {
        loadReminders();
    }, [carId]);

    const toggleReminder = async (reminder: Reminder) => {
        try {
        const updatedReminder = { ...reminder, enabled: !reminder.enabled };
        
        await remindersAPI.update(carId, reminder.id, { enabled: updatedReminder.enabled });
        
        setReminders(prev => 
            prev.map(r => r.id === reminder.id ? updatedReminder : r)
        );

        if (updatedReminder.enabled && reminder.noticeDate) {
            const noticeDate = new Date(reminder.noticeDate);
            const delaySeconds = Math.max(0, (noticeDate.getTime() - Date.now()) / 1000);
            
            if (delaySeconds > 0) {
            await scheduleReminder({
                id: reminder.id,
                title: `Напоминание: ${reminder.title}`,
                message: `Не забудьте ${reminder.type === 'замена' ? 'заменить' : 'проверить'} ${reminder.title}`,
                carId: carId,
                delaySeconds: delaySeconds,
            });
            }
        } else {
            await cancelReminder(reminder.id);
        }

        } catch (error: any) {
        console.error('❌ Ошибка обновления напоминания:', error);
        Alert.alert('Ошибка', 'Не удалось обновить напоминание');
        loadReminders();
        }
    };

    const handleDeleteReminder = async (reminder: Reminder) => {
        Alert.alert(
        'Удалить напоминание?',
        `Вы уверены, что хотите удалить "${reminder.title}"?`,
        [
            { text: 'Отмена', style: 'cancel' },
            {
            text: 'Удалить',
            style: 'destructive',
            onPress: async () => {
                try {
                await remindersAPI.delete(carId, reminder.id);
                await cancelReminder(reminder.id);
                setReminders(prev => prev.filter(r => r.id !== reminder.id));
                Alert.alert('Успех', 'Напоминание удалено');
                } catch (error: any) {
                console.error('❌ Ошибка удаления напоминания:', error);
                Alert.alert('Ошибка', 'Не удалось удалить напоминание');
                }
            },
            },
        ]
        );
    };

    const handleEditReminder = (reminder: Reminder) => {
        navigation.navigate('CreateReminder', { 
        carId,
        editReminder: reminder 
        });
    };

    const handleCreateReminder = () => {
        navigation.navigate('CreateReminder', { carId });
    };

    const handleRefresh = () => {
        setRefreshing(true);
        loadReminders();
    };

    if (loading) {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, adaptiveStyles.textSm]}>Загрузка напоминаний...</Text>
            </View>
        </SafeAreaView>
        );
    }

    const activeReminders = reminders.filter(r => r.enabled);
    const inactiveReminders = reminders.filter(r => !r.enabled);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#007AFF']}
            />
            }
        >
            <View style={styles.header}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Напоминания</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>
                {reminders.length} напоминаний
            </Text>
            </View>

            {activeReminders.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>АКТИВНЫЕ НАПОМИНАНИЯ</Text>
                <View
                style={[
                    styles.remindersGrid,
                    {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: 12,
                    },
                ]}
                >
                {activeReminders.map(reminder => (
                    <View
                    key={reminder.id}
                    style={[
                        styles.reminderCard,
                        adaptiveStyles.card,
                        isTablet && styles.reminderCardTablet,
                    ]}
                    >
                    <View style={styles.reminderHeader}>
                        <Text style={[styles.reminderTitle, adaptiveStyles.textMd]} numberOfLines={2}>
                        {reminder.title}
                        </Text>
                        <Switch
                        value={reminder.enabled}
                        onValueChange={() => toggleReminder(reminder)}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.reminderDetails}>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Тип:</Text>
                        <Text style={[styles.detailValue, adaptiveStyles.textSm]}>{reminder.type}</Text>
                        </View>
                        {reminder.mileage && (
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Пробег:</Text>
                            <Text style={[styles.detailValue, adaptiveStyles.textSm]}>
                            {reminder.mileage.toLocaleString()} км
                            </Text>
                        </View>
                        )}
                        {reminder.date && (
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Дата:</Text>
                            <Text style={[styles.detailValue, adaptiveStyles.textSm]}>
                            {new Date(reminder.date).toLocaleDateString('ru-RU')}
                            </Text>
                        </View>
                        )}
                        {reminder.noticeDate && (
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Уведомление:</Text>
                            <Text style={[styles.detailValue, adaptiveStyles.textSm]}>
                            {new Date(reminder.noticeDate).toLocaleDateString('ru-RU')}
                            </Text>
                        </View>
                        )}
                    </View>
                    
                    <View style={styles.reminderActions}>
                        <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => handleEditReminder(reminder)}
                        >
                        <Text style={[styles.editButtonText, adaptiveStyles.textXs]}>Редактировать</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => handleDeleteReminder(reminder)}
                        >
                        <Text style={[styles.deleteButtonText, adaptiveStyles.textXs]}>Удалить</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                ))}
                </View>
            </View>
            )}

            {inactiveReminders.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>НЕАКТИВНЫЕ НАПОМИНАНИЯ</Text>
                <View
                style={[
                    styles.remindersGrid,
                    {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: 12,
                    },
                ]}
                >
                {inactiveReminders.map(reminder => (
                    <View
                    key={reminder.id}
                    style={[
                        styles.reminderCard,
                        styles.inactiveCard,
                        adaptiveStyles.card,
                        isTablet && styles.reminderCardTablet,
                    ]}
                    >
                    <View style={styles.reminderHeader}>
                        <Text style={[styles.reminderTitle, styles.inactiveText, adaptiveStyles.textMd]} numberOfLines={2}>
                        {reminder.title}
                        </Text>
                        <Switch
                        value={reminder.enabled}
                        onValueChange={() => toggleReminder(reminder)}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.reminderDetails}>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, styles.inactiveText, adaptiveStyles.textXs]}>Тип:</Text>
                        <Text style={[styles.detailValue, styles.inactiveText, adaptiveStyles.textSm]}>{reminder.type}</Text>
                        </View>
                        {reminder.mileage && (
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailLabel, styles.inactiveText, adaptiveStyles.textXs]}>Пробег:</Text>
                            <Text style={[styles.detailValue, styles.inactiveText, adaptiveStyles.textSm]}>
                            {reminder.mileage.toLocaleString()} км
                            </Text>
                        </View>
                        )}
                    </View>
                    </View>
                ))}
                </View>
            </View>
            )}

            {reminders.length === 0 && (
            <View style={styles.emptyState}>
                <Text style={[styles.emptyText, adaptiveStyles.textMd]}>
                Нет напоминаний
                </Text>
                <Text style={[styles.emptySubtext, adaptiveStyles.textSm]}>
                Создайте первое напоминание для вашего автомобиля
                </Text>
            </View>
            )}

            <TouchableOpacity
            style={[styles.createButton, { backgroundColor: '#007AFF' }]}
            onPress={handleCreateReminder}
            >
            <Text style={[styles.createButtonText, adaptiveStyles.textMd]}>+ Создать напоминание</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingVertical: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        color: '#666',
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 16,
        color: '#1a1a1a',
        textTransform: 'uppercase',
    },
    remindersGrid: {
        marginTop: 8,
    },
    reminderCard: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    reminderCardTablet: {
        width: '48%',
    },
    inactiveCard: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    reminderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    reminderTitle: {
        flex: 1,
        marginRight: 12,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    inactiveText: {
        color: '#999',
    },
    reminderDetails: {
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    detailLabel: {
        fontWeight: '500',
        color: '#666',
    },
    detailValue: {
        fontWeight: '500',
        color: '#1a1a1a',
    },
    reminderActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    editButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    editButtonText: {
        color: '#f3f3f3ff',
        fontWeight: '500',
    },
    deleteButtonText: {
        color: '#f3f3f3ff',
        fontWeight: '500',
    },
    createButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    createButtonText: {
        fontWeight: '600',
        color: 'white',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        textAlign: 'center',
        color: '#999',
    },
    });