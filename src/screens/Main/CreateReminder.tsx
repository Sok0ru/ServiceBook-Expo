    import React, { useState, useEffect } from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Switch,
    Alert,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';
    import { remindersAPI, CreateReminderData } from '../../api/reminders';
    import { useNotification } from '../../contexts/NotificationContext';
    import { Reminder } from '../../api/reminders';

    type CreateReminderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateReminder'>;
    type CreateReminderRouteProp = RouteProp<RootStackParamList, 'CreateReminder'>;

    type ReminderType = 'замена' | 'проверка';

    export default function CreateReminder() {
    const navigation = useNavigation<CreateReminderScreenNavigationProp>();
    const route = useRoute<CreateReminderRouteProp>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const { scheduleReminder, cancelReminder } = useNotification();

    const carId = route.params?.carId || 'default-car-id';
    const isEditing   = Boolean(route.params?.editReminder);
    const editReminder = route.params?.editReminder as Reminder | undefined;
    const [reminder, setReminder] = useState({
        title: '',
        type: 'замена' as ReminderType,
        mileage: '',
        date: '',
        noticeDate: '',
        enabled: true,
    });

    const [selectedOptions, setSelectedOptions] = useState({
        действие: false,
        пробег: true,
        время: true,
        уведомление: true,
    });

    const [loading, setLoading] = useState(false);

    const toggleOption = (option: keyof typeof selectedOptions) => {
        setSelectedOptions({
        ...selectedOptions,
        [option]: !selectedOptions[option],
        });
    };

    const calculateNoticeDate = (baseDate: string): string => {
        if (!baseDate) return '';
        
        const date = new Date(baseDate);
        date.setDate(date.getDate() - 7); // Уведомление за 7 дней
        return date.toISOString().split('T')[0];
    };

    // Автоматически рассчитываем дату уведомления при изменении основной даты
    useEffect(() => {
        if (selectedOptions.уведомление && reminder.date) {
        const noticeDate = calculateNoticeDate(reminder.date);
        setReminder(prev => ({ ...prev, noticeDate }));
        }
    }, [reminder.date, selectedOptions.уведомление]);

  const handleCreateReminder = async () => {
    if (!reminder.title.trim()) {
      Alert.alert('Ошибка', 'Введите название напоминания');
      return;
    }

    setLoading(true);

    try {
      const reminderData: CreateReminderData = {
        title: reminder.title,
        type: reminder.type,
        enabled: reminder.enabled,
        mileage: selectedOptions.пробег && reminder.mileage ? parseInt(reminder.mileage) : undefined,
        date: selectedOptions.время && reminder.date ? reminder.date : undefined,
        noticeDate: selectedOptions.уведомление && reminder.noticeDate ? reminder.noticeDate : undefined,
      };

      console.log(`📤 ${isEditing ? 'Обновляю' : 'Создаю'} напоминание:`, reminderData);

      let createdReminder: Reminder;

      if (isEditing && editReminder) {
        // Режим редактирования
        createdReminder = await remindersAPI.update(carId, editReminder.id, reminderData);
        console.log('✅ Напоминание обновлено:', createdReminder);
        
        // Отменяем старое уведомление
        await cancelReminder(editReminder.id);
      } else {
        // Режим создания
        createdReminder = await remindersAPI.create(carId, reminderData);
        console.log('✅ Напоминание создано:', createdReminder);
      }

      // Создаем новое локальное уведомление если включено и указана дата
      if (reminder.enabled && reminder.noticeDate) {
        try {
          const noticeDate = new Date(reminder.noticeDate);
          const delaySeconds = Math.max(0, (noticeDate.getTime() - Date.now()) / 1000);
          
          if (delaySeconds > 0) {
            await scheduleReminder({
              id: createdReminder.id,
              title: `Напоминание: ${reminder.title}`,
              message: `Не забудьте ${reminder.type === 'замена' ? 'заменить' : 'проверить'} ${reminder.title}`,
              carId: carId,
              delaySeconds: delaySeconds,
            });
            console.log('✅ Локальное уведомление создано');
          }
        } catch (notificationError) {
          console.error('❌ Ошибка создания уведомления:', notificationError);
        }
      }

      Alert.alert('Успех', `Напоминание ${isEditing ? 'обновлено' : 'создано'}!`, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);

    } catch (error: any) {
      console.error(`❌ Ошибка ${isEditing ? 'обновления' : 'создания'} напоминания:`, error);
      Alert.alert(
        'Ошибка',
        error.response?.data?.message || `Не удалось ${isEditing ? 'обновить' : 'создать'} напоминание`
      );
    } finally {
      setLoading(false);
    }
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
                placeholder="Название напоминания *"
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
                    placeholder="Дата события (ГГГГ-ММ-ДД)"
                    placeholderTextColor="#999"
                    value={reminder.date}
                    onChangeText={(text) => setReminder({ ...reminder, date: text })}
                />
                </View>
            )}

            {/* Уведомление */}
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Уведомление</Text>
                <Text style={[styles.optionDescription, adaptiveStyles.textXs]}>Push-уведомление перед событием</Text>
                </View>
                <Switch
                value={selectedOptions.уведомление}
                onValueChange={() => toggleOption('уведомление')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={selectedOptions.уведомление ? '#007AFF' : '#f4f3f4'}
                />
            </View>

            {selectedOptions.уведомление && selectedOptions.время && (
                <View style={styles.optionContent}>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Дата уведомления (рассчитана автоматически)"
                    placeholderTextColor="#999"
                    value={reminder.noticeDate}
                    editable={false}
                />
                <Text style={[styles.hint, adaptiveStyles.textXs]}>
                    Уведомление придет за 7 дней до события
                </Text>
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
            style={[
                styles.createButton, 
                { backgroundColor: loading ? '#ccc' : '#007AFF' }
            ]}
            onPress={handleCreateReminder}
            disabled={loading}
            >
            <Text style={[styles.createButtonText, adaptiveStyles.textMd]}>
                {loading ? 'Создание...' : 'Создать напоминание'}
            </Text>
            </TouchableOpacity>

            {/* Отступ для таб-бара */}
            <View style={{ height: 20 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    // Стили остаются без изменений
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
    hint: {
        color: '#666',
        fontStyle: 'italic',
        marginTop: 4,
    },
    });