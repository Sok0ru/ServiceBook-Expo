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
    import { RootStackParamList, Reminder } from '../../types/navigation';
    import { remindersAPI } from '../../api/reminders';
    import { useNotification } from '../../contexts/NotificationContext';
    import { carsAPI } from '../../api/cars';

    type NavProp = StackNavigationProp<RootStackParamList, 'Reminders'>;
    type RoutePropT = RouteProp<RootStackParamList, 'Reminders'>;

    /* ----------  безопасный форматтер  ---------- */
    const safeDate = (iso?: number): string => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? ''
        : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    };

    export default function Reminders() {
    const [carName, setCarName] = useState('');
    const nav = useNavigation<NavProp>();
    const route = useRoute<RoutePropT>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const { scheduleReminder, cancelReminder } = useNotification();

    // Получаем carId из параметров навигации
    const carId = route.params?.carId;
    
    // Проверяем наличие carId
    if (!carId) {
        console.error('❌ carId не передан в Reminders');
        Alert.alert('Ошибка', 'Не выбран автомобиль');
        nav.goBack();
        return null;
    }

    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadReminders = async () => {
        try {
            setLoading(true);
            //console.log('📥 Загружаю напоминания для carId:', carId);
            
            const response = await remindersAPI.getByCar(carId);
            console.log('📥 Полный ответ от remindersAPI.getByCar:', response);
            
            // Обработка разных форматов ответа
            let remindersData: Reminder[] = [];
            
            if (Array.isArray(response)) {
            remindersData = response;
            } else if (response && typeof response === 'object') {
            // Основной случай - напоминания в поле "details"
            if ('details' in response && Array.isArray(response.details)) {
                remindersData = response.details;
            } 
            // Другие возможные форматы
            else if ('data' in response && Array.isArray(response.data)) {
                remindersData = response.data;
            } else if ('reminders' in response && Array.isArray(response.reminders)) {
                remindersData = response.reminders;
            } else if ('cars' in response && Array.isArray(response.cars)) {
                remindersData = response.cars;
            }
            }
            
            console.log('📋 Обработанные напоминания:', remindersData);
            setReminders(remindersData);
        } catch (e: any) {
            console.error('❌ Ошибка загрузки напоминаний:', {
            status: e.response?.status,
            data: e.response?.data,
            message: e.message
            });
            Alert.alert('Ошибка', 'Не удалось загрузить напоминания');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
        };

    useEffect(() => {
        const loadCarName = async () => {
        try {
            const cars = await carsAPI.list();
            const car = cars.find(c => c.id === carId);
            if (car) {
            setCarName(`${car.brand} ${car.model}`);
            console.log('🚗 Найдена машина для напоминаний:', car.brand, car.model);
            } else {
            console.warn('⚠️ Машина не найдена для carId:', carId);
            setCarName('Неизвестный автомобиль');
            }
        } catch (e) {
            console.warn('Не удалось загрузить машину', e);
            setCarName('Ошибка загрузки');
        }
        };
        
        loadCarName();
        loadReminders();
    }, [carId]);

    const toggleReminder = async (r: Reminder) => {
        const newEnabled = !r.enabled;

        // Optimistic update
        setReminders(prev =>
        prev.map(item =>
            item.id === r.id ? { ...item, enabled: newEnabled } : item
        )
        );

        try {
        const updated = await remindersAPI.update(carId, r.id, {
            ...r,
            enabled: newEnabled,
        });

        // Подтверждение с сервера
        setReminders(prev =>
            prev.map(item => (item.id === r.id ? updated : item))
        );
        } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось обновить');
        // Откат при ошибке
        setReminders(prev =>
            prev.map(item =>
            item.id === r.id ? { ...item, enabled: r.enabled } : item
            )
        );
        }
    };

    const handleDelete = (r: Reminder) => {
        Alert.alert('Удалить?', `"${r.name}"`, [
        { text: 'Отмена', style: 'cancel' },
        {
            text: 'Удалить',
            style: 'destructive',
            onPress: async () => {
            try {
                await remindersAPI.delete(carId, r.id);
                await cancelReminder(r.id);
                setReminders(prev => prev.filter(item => item.id !== r.id));
            } catch (e: any) {
                Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось удалить');
            }
            },
        },
        ]);
    };

    const handleEdit = (r: Reminder) => nav.navigate('CreateReminder', { carId, editReminder: r });

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

    const active = Array.isArray(reminders) ? reminders.filter(r => r.enabled) : [];
    const inactive = Array.isArray(reminders) ? reminders.filter(r => !r.enabled) : [];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
            <RefreshControl 
                refreshing={refreshing} 
                onRefresh={() => { 
                setRefreshing(true); 
                loadReminders(); 
                }} 
                colors={['#007AFF']} 
            />
            }
        >
            <View style={styles.header}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Напоминания</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>
                {carName || 'Машина'} · {reminders.length} шт.
            </Text>
            </View>
            
            {active.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>АКТИВНЫЕ</Text>
                {active.map(r => (
                <View key={r.id} style={[styles.card, adaptiveStyles.card, isTablet && styles.cardTablet]}>
                    <View style={styles.rowBetween}>
                    <Text style={[styles.name, adaptiveStyles.textMd]} numberOfLines={2}>{r.name}</Text>
                    <Switch value={r.enabled} onValueChange={() => toggleReminder(r)} />
                    </View>

                    <View style={styles.detail}>
                    <Text style={styles.tag}>🏷 {r.tag}</Text>
                    {r.noticeType === 'mileage' && r.mileageNotice && (
                        <Text style={styles.detail}>📏 {r.mileageNotice.toLocaleString()} км</Text>
                    )}
                    {r.noticeType === 'date' && r.dateNotice && (
                        <Text style={styles.detail}>📅 {safeDate(r.dateNotice)}</Text>
                    )}
                    </View>

                    <View style={styles.actions}>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(r)}>
                        <Text style={styles.editText}>Редактировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(r)}>
                        <Text style={styles.deleteText}>Удалить</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                ))}
            </View>
            )}

            {inactive.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>НЕАКТИВНЫЕ</Text>
                {inactive.map(r => (
                <View key={r.id} style={[styles.card, styles.inactive, adaptiveStyles.card, isTablet && styles.cardTablet]}>
                    <View style={styles.rowBetween}>
                    <Text style={[styles.nameInactive, adaptiveStyles.textMd]} numberOfLines={2}>{r.name}</Text>
                    <Switch value={r.enabled} onValueChange={() => toggleReminder(r)} />
                    </View>
                    <Text style={[styles.tagInactive, { color: '#aaa' }]}>🏷 {r.tag}</Text>
                </View>
                ))}
            </View>
            )}

            {reminders.length === 0 && (
            <View style={styles.empty}>
                <Text style={[styles.emptyTitle, adaptiveStyles.textMd]}>Нет напоминаний</Text>
                <Text style={[styles.emptySub, adaptiveStyles.textSm]}>Создайте первое напоминание для вашего автомобиля</Text>
            </View>
            )}

            <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: '#007AFF' }]} 
            onPress={() => nav.navigate('CreateReminder', { carId })}
            >
            <Text style={[styles.createButtonText, adaptiveStyles.textMd]}>+ Создать напоминание</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    // Стили остаются без изменений
    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f3f3ff' },
    scrollContent: { paddingHorizontal: 16, paddingVertical: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 16, color: '#666' },
    header: { marginBottom: 24 },
    title: { fontWeight: 'bold', color: '#1a1a1a' },
    subtitle: { color: '#666' },
    section: { marginBottom: 24 },
    sectionTitle: { fontWeight: '600', marginBottom: 12, color: '#1a1a1a', textTransform: 'uppercase' },
    card: { padding: 16, marginBottom: 12, backgroundColor: 'white', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
    cardTablet: { width: '48%', marginHorizontal: '1%' },
    inactive: { backgroundColor: '#f8f8f8', borderWidth: 1, borderColor: '#e0e0e0' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    name: { flex: 1, marginRight: 12, fontWeight: '600', color: '#1a1a1a' },
    nameInactive: { flex: 1, marginRight: 12, fontWeight: '600', color: '#999' },
    tag: { color: '#007AFF', fontSize: 12, marginBottom: 4 },
    tagInactive: { color: '#999', fontSize: 12, marginTop: 4 },
    detail: { color: '#666', fontSize: 12, marginBottom: 2 },
    actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, gap: 12 },
    editButton: { backgroundColor: '#007AFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
    deleteButton: { backgroundColor: '#FF3B30', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
    editText: { color: '#fff', fontWeight: '500', fontSize: 12 },
    deleteText: { color: '#fff', fontWeight: '500', fontSize: 12 },
    empty: { alignItems: 'center', paddingVertical: 60 },
    emptyTitle: { textAlign: 'center', color: '#666', marginBottom: 8 },
    emptySub: { textAlign: 'center', color: '#999' },
    createButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8, shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    createButtonText: { fontWeight: '600', color: 'white' },
    });