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
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type MainStackParamList = {
    Reminders: undefined;
    CreateReminder: undefined;
    };

    type RemindersScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Reminders'>;

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
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

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
        reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
        ));
    };

    const activeReminders = reminders.filter(r => r.enabled);
    const inactiveReminders = reminders.filter(r => !r.enabled);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Заголовок */}
            <View style={styles.header}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Напоминания</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Управление сервисными напоминаниями</Text>
            </View>

            {/* Активные напоминания */}
            {activeReminders.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>АКТИВНЫЕ НАПОМИНАНИЯ</Text>
                <View
                style={[
                    styles.remindersGrid,
                    {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: adaptiveValues.spacing.lg,
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
                        onValueChange={() => toggleReminder(reminder.id)}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.reminderDetails}>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Тип:</Text>
                        <Text style={[styles.detailValue, adaptiveStyles.textSm]}>{reminder.type}</Text>
                        </View>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Пробег:</Text>
                        <Text style={[styles.detailValue, adaptiveStyles.textSm]}>
                            {reminder.mileage.toLocaleString()} км
                        </Text>
                        </View>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, adaptiveStyles.textXs]}>Дата:</Text>
                        <Text style={[styles.detailValue, adaptiveStyles.textSm]}>
                            {new Date(reminder.date).toLocaleDateString('ru-RU')}
                        </Text>
                        </View>
                    </View>
                        <View
                        style={[
                            styles.reminderActions,
                            { flexDirection: isTablet ? 'row' : 'row' }, // всегда в строку
                        ]}
                        >
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={[styles.editButtonText, adaptiveStyles.textXs]}>Редактировать</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={[styles.deleteButtonText, adaptiveStyles.textXs]}>Удалить</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                ))}
                </View>
            </View>
            )}

            {/* Неактивные напоминания */}
            {inactiveReminders.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>НЕАКТИВНЫЕ НАПОМИНАНИЯ</Text>
                <View
                style={[
                    styles.remindersGrid,
                    {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: adaptiveValues.spacing.lg,
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
                        onValueChange={() => toggleReminder(reminder.id)}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.reminderDetails}>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, styles.inactiveText, adaptiveStyles.textXs]}>Тип:</Text>
                        <Text style={[styles.detailValue, styles.inactiveText, adaptiveStyles.textSm]}>{reminder.type}</Text>
                        </View>
                        <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, styles.inactiveText, adaptiveStyles.textXs]}>Пробег:</Text>
                        <Text style={[styles.detailValue, styles.inactiveText, adaptiveStyles.textSm]}>
                            {reminder.mileage.toLocaleString()} км
                        </Text>
                        </View>
                    </View>
                    </View>
                ))}
                </View>
            </View>
            )}

            {/* Кнопка создания */}
            <TouchableOpacity
            style={[styles.createButton, { backgroundColor: '#007AFF' }]}
            onPress={() => navigation.navigate('CreateReminder')}
            >
            <Text style={[styles.createButtonText, adaptiveStyles.textMd]}>+ Создать напоминание</Text>
            </TouchableOpacity>

            {/* Отступ для таб-бара */}
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
    fullWidthButton: {
        width: '100%',
        alignItems: 'center',
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
    });