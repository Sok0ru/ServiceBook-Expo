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
    FlatList,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';
    import { remindersAPI, CreateReminderData } from '../../api/reminders';
    import { useNotification } from '../../contexts/NotificationContext';
    import { Reminder } from '../../api/reminders';
    import { getToken } from '../../utils/tokenSync';
    import { carsAPI } from '../../api/cars';

    type NavProp = StackNavigationProp<RootStackParamList, 'CreateReminder'>;
    type RoutePropT = RouteProp<RootStackParamList, 'CreateReminder'>;

    type NoticeType = 'mileage' | 'date';

    const PRESET_TAGS = [
    'Ходовая часть',
    'Двигатель',
    'Электрика',
    'Тормозная система',
    'Трансмиссия',
    'Салон / Комфорт',
    ] as const;

    const safeDate = (iso?: string): string => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? ''
        : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    };

    export default function CreateReminder() {
    const [carName, setCarName] = useState('');
    const nav = useNavigation<NavProp>();
    const route = useRoute<RoutePropT>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const { scheduleReminder, cancelReminder } = useNotification();

    const carId = route.params?.carId || ''; 
    if (!carId) {
    Alert.alert('Ошибка', 'Не выбрана машина');
    nav.goBack();
    return;
    }
    const isEditing = Boolean(route.params?.editReminder);
    const editReminder = route.params?.editReminder as Reminder | undefined;

    /* --------- state ---------- */
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [customTag, setCustomTag] = useState('');
    const [noticeType, setNoticeType] = useState<NoticeType>('date');
    const [mileageNotice, setMileageNotice] = useState('');
    const [dateNotice, setDateNotice] = useState('');
    const [enabled, setEnabled] = useState(true);
    const [loading, setLoading] = useState(false);

    /* --------- preload ---------- */
    useEffect(() => {
    const loadCar = async () => {
        const cars = await carsAPI.list();
        const car = cars.find(c => c.id === carId);
        if (car) setCarName(`${car.brand} ${car.model}`);
    };
    if (carId) loadCar();
        }, [isEditing, editReminder]);

    /* --------- handlers ---------- */
        const token = getToken();
        if (!token) {
        Alert.alert('Ошибка', 'Вы не авторизованы. Войдите в аккаунт');
        nav.navigate('LogIn');
        return;
        }
    const handleSave = async () => {
        if (!name.trim()) return Alert.alert('Ошибка', 'Введите название');
        const finalTag = tag === 'Свой вариант' ? customTag.trim() : tag;
        if (!finalTag) return Alert.alert('Ошибка', 'Выберите или введите тег');

        const data: CreateReminderData = {
        name,
        tag: finalTag,
        noticeType,
        mileageNotice: noticeType === 'mileage' ? parseInt(mileageNotice) || 0 : undefined,
        dateNotice: noticeType === 'date' && dateNotice ? new Date(dateNotice).getTime() : undefined,
        enabled,
        };
        console.log('📤 POST /api/details/{carId}', {
            carId,
            body: {
            name,
            tag: finalTag,
            noticeType,
            mileageNotice: noticeType === 'mileage' ? parseInt(mileageNotice) || 0 : undefined,
            dateNotice: noticeType === 'date' && dateNotice ? new Date(dateNotice).getTime() : undefined,
            enabled,
            },
        });
        console.log('📤 Создаю для carId:', carId, data);


        setLoading(true);
        try {
        if (isEditing && editReminder) {
            const updated = await remindersAPI.update(carId, editReminder.id, data);
            await cancelReminder(updated.id);
            if (updated.enabled && updated.dateNotice) {
            await scheduleReminder({
                id: updated.id,
                title: `Напоминание: ${updated.name}`,
                message: `Пора проверить ${updated.name}`,
                carId,
                delaySeconds: Math.max(0, (updated.dateNotice - Date.now()) / 1000),
            });
            }
        } else {
            const created = await remindersAPI.create(carId, data);
            if (created.enabled && created.dateNotice) {
            await scheduleReminder({
                id: created.id,
                title: `Напоминание: ${created.name}`,
                message: `Пора проверить ${created.name}`,
                carId,
                delaySeconds: Math.max(0, (created.dateNotice - Date.now()) / 1000),
            });
            }
        }
        Alert.alert('Успех', `Напоминание ${isEditing ? 'обновлено' : 'создано'}!`, [
            { text: 'OK', onPress: () => nav.goBack() },
        ]);
        } catch (e: any) {
            console.error('❌ Ответ сервера:', {
            status: e.response?.status,
            data: e.response?.data,
            headers: e.response?.headers,
            });
            Alert.alert(
            'Ошибка',
            e.response?.data?.message || JSON.stringify(e.response?.data) || 'Не удалось сохранить'
            );
        } finally {
            setLoading(false);
        }
        };
    console.log('📤 Создаю для carId:', carId); 
    /* --------- UI ---------- */
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>{carName || 'Машина'}</Text>
            <Text style={[styles.title, adaptiveStyles.textXl]}>{isEditing ? 'Редактировать' : 'Создать'} напоминание</Text>

            {/* Название */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>НАЗВАНИЕ</Text>
            <TextInput
                style={[styles.input, adaptiveStyles.textSm]}
                placeholder="Например, Замена масла"
                value={name}
                onChangeText={setName}
            />
            </View>

            {/* Тег */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>ТЕГ</Text>
            <FlatList
                data={[...PRESET_TAGS, 'Свой вариант']}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={[styles.tagButton, tag === item && styles.tagSelected]}
                    onPress={() => {
                    setTag(item);
                    if (item !== 'Свой вариант') setCustomTag('');
                    }}
                >
                    <Text style={[styles.tagText, tag === item && styles.tagTextSelected]}>{item}</Text>
                </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
            />
            {tag === 'Свой вариант' && (
                <TextInput
                style={[styles.input, adaptiveStyles.textSm]}
                placeholder="Введите свой тег"
                value={customTag}
                onChangeText={setCustomTag}
                />
            )}
            </View>

            {/* Когда напомнить */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>КОГДА НАПОМНИТЬ</Text>
            <View style={styles.optionRow}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Тип</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                {(['mileage', 'date'] as const).map((t) => (
                    <TouchableOpacity
                    key={t}
                    style={[styles.miniButton, noticeType === t && styles.miniSelected]}
                    onPress={() => setNoticeType(t)}
                    >
                    <Text style={[styles.miniText, noticeType === t && styles.miniTextSelected]}>
                        {t === 'mileage' ? 'По пробегу' : 'По дате'}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            {noticeType === 'mileage' && (
                <TextInput
                style={[styles.input, adaptiveStyles.textSm]}
                placeholder="Пробег, км"
                keyboardType="numeric"
                value={mileageNotice}
                onChangeText={setMileageNotice}
                />
            )}

            {noticeType === 'date' && (
                <>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Дата (ГГГГ-ММ-ДД)"
                    value={dateNotice}
                    onChangeText={(raw) => {
                    const cleaned = raw.replace(/[^\d-]/g, '');
                    setDateNotice(cleaned);
                    }}
                />
                {dateNotice && (
                    <Text style={[styles.hint, adaptiveStyles.textXs]}>
                    {safeDate(dateNotice) || 'Некорректная дата'}
                    </Text>
                )}
                </>
            )}
            </View>

            {/* Статус */}
            <View style={[styles.section, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>СТАТУС</Text>
            <View style={styles.optionRow}>
                <View style={styles.optionInfo}>
                <Text style={[styles.optionTitle, adaptiveStyles.textMd]}>Активно</Text>
                <Text style={[styles.optionDescription, adaptiveStyles.textXs]}>Включить уведомления</Text>
                </View>
                <Switch
                value={enabled}
                onValueChange={setEnabled}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={enabled ? '#007AFF' : '#f4f3f4'}
                />
            </View>
            </View>

            {/* Кнопка */}
            <TouchableOpacity
            style={[styles.createButton, { backgroundColor: loading ? '#ccc' : '#007AFF' }]}
            onPress={handleSave}
            disabled={loading}
            >
            <Text style={[styles.createButtonText, adaptiveStyles.textMd]}>
                {loading ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Создать')}
            </Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    // Стили
    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    scrollContent: { padding: 16, paddingBottom: 20 },
    title: { textAlign: 'center', marginBottom: 24, color: '#1a1a1a', fontWeight: 'bold' },
    section: { padding: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
    sectionTitle: { fontWeight: '600', marginBottom: 12, color: '#666', textTransform: 'uppercase' },
    input: { borderWidth: 1, borderColor: '#dddddd', borderRadius: 8, padding: 12, backgroundColor: '#f8f8f8', marginBottom: 8 },
    optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    optionInfo: { flex: 1, marginRight: 16 },
    optionTitle: { color: '#1a1a1a', fontWeight: '500' },
    optionDescription: { color: '#666', fontSize: 12 },
    tagButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#ccc', marginRight: 8 },
    tagSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
    tagText: { color: '#666', fontSize: 14 },
    tagTextSelected: { color: '#fff' },
    miniButton: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ccc' },
    miniSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
    miniText: { color: '#666', fontSize: 12 },
    miniTextSelected: { color: '#fff' },
    createButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8, shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    createButtonText: { fontWeight: '600', color: 'white' },
    hint: { color: '#666', fontStyle: 'italic', marginTop: 4 },
    subtitle: {textAlign: 'center', marginBottom: 16, color: '#666', fontSize: 14, },
    });