    import React, { useState } from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';

    type MainStackParamList = {
    Reminders: undefined;
    Dashboard: undefined;
    CreateReminder: undefined;
    };

    type RemindersScreenNavigationProp = StackNavigationProp<
    MainStackParamList,
    'Reminders'
    >;

    type Props = {
    navigation: RemindersScreenNavigationProp;
    };

    type Reminder = {
    id: string;
    title: string;
    type: 'замена' | 'проверка';
    mileage: number;
    date: string;
    enabled: boolean;
    };

    export default function Reminders({ navigation }: Props) {
    const [reminders, setReminders] = useState<Reminder[]>([
        {
        id: '1',
        title: 'Замена масла двигателя',
        type: 'замена',
        mileage: 125000,
        date: '2024-12-15',
        enabled: true,
        },
        {
        id: '2',
        title: 'Проверка тормозных колодок',
        type: 'проверка',
        mileage: 127000,
        date: '2025-01-20',
        enabled: true,
        },
        {
        id: '3',
        title: 'Замена воздушного фильтра',
        type: 'замена',
        mileage: 130000,
        date: '2025-03-10',
        enabled: false,
        },
    ]);

    const toggleReminder = (id: string) => {
        setReminders(reminders.map(reminder => 
        reminder.id === id 
            ? { ...reminder, enabled: !reminder.enabled }
            : reminder
        ));
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Заголовок */}
            <View style={styles.header}>
            <Text style={styles.title}>Напоминания</Text>
            <Text style={styles.subtitle}>Управление сервисными напоминаниями</Text>
            </View>

            {/* Активные напоминания */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>АКТИВНЫЕ НАПОМИНАНИЯ</Text>
            
            {reminders
                .filter(reminder => reminder.enabled)
                .map(reminder => (
                <View key={reminder.id} style={styles.reminderCard}>
                    <View style={styles.reminderHeader}>
                    <Text style={styles.reminderTitle}>{reminder.title}</Text>
                    <Switch
                        value={reminder.enabled}
                        onValueChange={() => toggleReminder(reminder.id)}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                    />
                    </View>
                    
                    <View style={styles.reminderDetails}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Тип:</Text>
                        <Text style={styles.detailValue}>{reminder.type}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Пробег:</Text>
                        <Text style={styles.detailValue}>{reminder.mileage.toLocaleString()} км</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Дата:</Text>
                        <Text style={styles.detailValue}>
                        {new Date(reminder.date).toLocaleDateString('ru-RU')}
                        </Text>
                    </View>
                    </View>
                    
                    <View style={styles.reminderActions}>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Редактировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Удалить</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                ))
            }
            </View>

            {/* Неактивные напоминания */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>НЕАКТИВНЫЕ НАПОМИНАНИЯ</Text>
            
            {reminders
                .filter(reminder => !reminder.enabled)
                .map(reminder => (
                <View key={reminder.id} style={[styles.reminderCard, styles.inactiveCard]}>
                    <View style={styles.reminderHeader}>
                    <Text style={[styles.reminderTitle, styles.inactiveText]}>{reminder.title}</Text>
                    <Switch
                        value={reminder.enabled}
                        onValueChange={() => toggleReminder(reminder.id)}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                    />
                    </View>
                    
                    <View style={styles.reminderDetails}>
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, styles.inactiveText]}>Тип:</Text>
                        <Text style={[styles.detailValue, styles.inactiveText]}>{reminder.type}</Text>
                    </View>
                    
                    <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, styles.inactiveText]}>Пробег:</Text>
                        <Text style={[styles.detailValue, styles.inactiveText]}>
                        {reminder.mileage.toLocaleString()} км
                        </Text>
                    </View>
                    </View>
                </View>
                ))
            }
            </View>

            {/* Кнопка создания нового напоминания */}
            <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateReminder')} 
            >
            <Text style={styles.createButtonText}>+ Создать напоминание</Text>
            </TouchableOpacity>
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
        padding: 16,
        paddingTop: 0, 
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    reminderCard: {
        backgroundColor: '#f3f3f3ff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    inactiveCard: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    reminderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    reminderTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        flex: 1,
        marginRight: 12,
    },
    inactiveText: {
        color: '#999',
    },
    reminderDetails: {
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    reminderActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    editButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#007AFF',
        borderRadius: 6,
    },
    editButtonText: {
        color: '#f3f3f3ff',
        fontSize: 12,
        fontWeight: '500',
    },
    deleteButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FF3B30',
        borderRadius: 6,
    },
    deleteButtonText: {
        color: '#f3f3f3ff',
        fontSize: 12,
        fontWeight: '500',
    },
    createButton: {
        backgroundColor: '#007AFF',
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
        color: '#f3f3f3ff',
        fontSize: 16,
        fontWeight: '600',
    },
    });