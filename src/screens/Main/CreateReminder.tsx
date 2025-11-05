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

    type MainStackParamList = {
    CreateReminder: undefined;
    Reminders: undefined;
    Dashboard: undefined;
    };

    type CreateReminderScreenNavigationProp = StackNavigationProp<
    MainStackParamList,
    'CreateReminder'
    >;

    type Props = {
    navigation: CreateReminderScreenNavigationProp;
    };

    type ReminderType = 'замена' | 'проверка';

    export default function CreateReminder({ navigation }: Props) {
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
        // TODO: Сохранение напоминания
        console.log('Создано напоминание:', reminder);
        navigation.navigate('Reminders');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <Text style={styles.title}>Создать напоминание</Text>

            {/* Основная информация */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>ОСНОВНАЯ ИНФОРМАЦИЯ</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Название напоминания"
                placeholderTextColor="#999"
                value={reminder.title}
                onChangeText={(text) => setReminder({...reminder, title: text})}
            />

            {/* Тип напоминания */}
            <View style={styles.typeContainer}>
                <Text style={styles.typeLabel}>Тип:</Text>
                <View style={styles.typeButtons}>
                {(['замена', 'проверка'] as ReminderType[]).map((type) => (
                    <TouchableOpacity
                    key={type}
                    style={[
                        styles.typeButton,
                        reminder.type === type && styles.typeButtonSelected,
                    ]}
                    onPress={() => setReminder({...reminder, type})}
                    >
                    <Text style={[
                        styles.typeButtonText,
                        reminder.type === type && styles.typeButtonTextSelected,
                    ]}>
                        {type}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>
            </View>

            {/* Настройки напоминания */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>НАСТРОЙКИ НАПОМИНАНИЯ</Text>

            {/* Действие */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Действие</Text>
                <Text style={styles.optionDescription}>Основное действие для напоминания</Text>
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
                    style={styles.input}
                    placeholder="Описание действия"
                    placeholderTextColor="#999"
                />
                </View>
            )}

            {/* Пробег */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Пробег</Text>
                <Text style={styles.optionDescription}>Уведомление по пробегу</Text>
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
                    style={styles.input}
                    placeholder="Пробег (км)"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={reminder.mileage}
                    onChangeText={(text) => setReminder({...reminder, mileage: text})}
                />
                </View>
            )}

            {/* Время */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Время</Text>
                <Text style={styles.optionDescription}>Уведомление по дате</Text>
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
                    style={styles.input}
                    placeholder="Дата (ДД.ММ.ГГГГ)"
                    placeholderTextColor="#999"
                    value={reminder.date}
                    onChangeText={(text) => setReminder({...reminder, date: text})}
                />
                </View>
            )}
            </View>

            {/* Статус напоминания */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>СТАТУС</Text>
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Активное напоминание</Text>
                <Text style={styles.optionDescription}>Включить уведомления</Text>
                </View>
                <Switch
                value={reminder.enabled}
                onValueChange={(value) => setReminder({...reminder, enabled: value})}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={reminder.enabled ? '#007AFF' : '#f4f3f4'}
                />
            </View>
            </View>

            {/* Кнопка создания */}
            <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateReminder}
            >
            <Text style={styles.createButtonText}>Создать напоминание</Text>
            </TouchableOpacity>

            {/* Отступ для таб-бара */}
            <View style={styles.bottomSpacer} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 24,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
        marginBottom: 12,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeLabel: {
        fontSize: 16,
        color: '#333',
        marginRight: 16,
        fontWeight: '500',
    },
    typeButtons: {
        flexDirection: 'row',
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
        fontSize: 14,
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
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
    },
    optionContent: {
        marginTop: 8,
        marginBottom: 8,
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
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSpacer: {
        height: 20,
    },
    });