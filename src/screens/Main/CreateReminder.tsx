    // src/screens/Main/CreateReminder.tsx
    import React, { useState } from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Switch,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type MainStackParamList = {
    CreateReminder: undefined;
    Reminders: undefined;
    };

    type CreateReminderScreenNavigationProp = StackNavigationProp<MainStackParamList, 'CreateReminder'>;

    type Props = {
    navigation: CreateReminderScreenNavigationProp;
    };

    type ReminderType = 'замена' | 'проверка';

    export default function CreateReminder({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

    const [reminder, setReminder] = useState({
        title: '',
        type: 'замена' as ReminderType,
        mileage: '',
        date: '',
        enabled: true,
    });

    const [selectedOptions, setSelectedOptions] = useState({
        действие: false,
        пробег: true,
        время: true,
    });

    const toggleOption = (option: keyof typeof selectedOptions) => {
        setSelectedOptions({
        ...selectedOptions,
        [option]: !selectedOptions[option],
        });
    };

    const handleCreateReminder = () => {
        navigation.navigate('Reminders');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <Text style={[styles.title, adaptiveStyles.textXl]}>Создать напоминание</Text>

            {/* Основная информация */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>ОСНОВНАЯ ИНФОРМАЦИЯ</Text>

            <TextInput
                style={[styles.input, adaptiveStyles.textSm]}
                placeholder="Название напоминания"
                placeholderTextColor="#999"
                value={reminder.title}
                onChangeText={(text) => setReminder({ ...reminder, title: text })}
            />

            <View style={styles.typeContainer}>
                <Text style={[styles.typeLabel, adaptiveStyles.textMd]}>Тип:</Text>
                <View
                style={[
                    styles.typeButtons,
                    { flexDirection: isTablet ? 'row' : 'column' },
                ]}
                >
                {(['замена', 'проверка'] as ReminderType[]).map((type) => (
                    <TouchableOpacity
                    key={type}
                    style={[
                        styles.typeButton,
                        reminder.type === type && styles.typeButtonSelected,
                    ]}
                    onPress={() => setReminder({ ...reminder, type })}
                    >
                    <Text
                        style={[
                        styles.typeButtonText,
                        reminder.type === type && styles.typeButtonTextSelected,
                        ]}
                    >
                        {type}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>
            </View>

            {/* Настройки напоминания */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>НАСТРОЙКИ НАПОМИНАНИЯ</Text>

            {/* Действие */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Действие</Text>
                <Text style={[styles.optionDescription, adaptiveStyles.textXs]}>Основное действие для напоминания</Text>
                </View>
                <Switch
                value={selectedOptions.действие}
                onValueChange={() => toggleOption('действие')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={selectedOptions.действие ? '#007AFF' : '#f4f3f4'}
                />
            </View>

            {selectedOptions.действие && (
                <View style={styles.optionContent}>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Описание действия"
                    placeholderTextColor="#999"
                />
                </View>
            )}

            {/* Пробег */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Пробег</Text>
                <Text style={[styles.optionDescription, adaptiveStyles.textXs]}>Уведомление по пробегу</Text>
                </View>
                <Switch
                value={selectedOptions.пробег}
                onValueChange={() => toggleOption('пробег')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={selectedOptions.пробег ? '#007AFF' : '#f4f3f4'}
                />
            </View>

            {selectedOptions.пробег && (
                <View style={styles.optionContent}>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Пробег (км)"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={reminder.mileage}
                    onChangeText={(text) => setReminder({ ...reminder, mileage: text })}
                />
                </View>
            )}

            {/* Время */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Время</Text>
                <Text style={[styles.optionDescription, adaptiveStyles.textXs]}>Уведомление по дате</Text>
                </View>
                <Switch
                value={selectedOptions.время}
                onValueChange={() => toggleOption('время')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={selectedOptions.время ? '#007AFF' : '#f4f3f4'}
                />
            </View>

            {selectedOptions.время && (
                <View style={styles.optionContent}>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Дата (ДД.ММ.ГГГГ)"
                    placeholderTextColor="#999"
                    value={reminder.date}
                    onChangeText={(text) => setReminder({ ...reminder, date: text })}
                />
                </View>
            )}
            </View>

            {/* Статус напоминания */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>СТАТУС</Text>
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Активное напоминание</Text>
                <Text style={[styles.optionDescription, adaptiveStyles.textXs]}>Включить уведомления</Text>
                </View>
                <Switch
                value={reminder.enabled}
                onValueChange={(value) => setReminder({ ...reminder, enabled: value })}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                />
            </View>
            </View>

            {/* Кнопка создания */}
            <TouchableOpacity
            style={[styles.createButton, { backgroundColor: '#007AFF' }]}
            onPress={handleCreateReminder}
            >
            <Text style={[styles.createButtonText, adaptiveStyles.textMd]}>Создать напоминание</Text>
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
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#1a1a1a',
    },
    section: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 16,
        color: '#666',
        textTransform: 'uppercase',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#f8f8f8',
        marginBottom: 12,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    typeLabel: {
        marginRight: 16,
        color: '#333',
        fontWeight: '500',
    },
    typeButtons: {
        gap: 8,
    },
    typeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
    typeButtonSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    typeButtonText: {
        color: '#666',
        fontWeight: '500',
    },
    typeButtonTextSelected: {
        color: 'white',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionInfo: {
        flex: 1,
        marginRight: 16,
    },
    optionTitle: {
        marginBottom: 4,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    optionDescription: {
        color: '#666',
    },
    optionContent: {
        marginTop: 8,
        marginBottom: 8,
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