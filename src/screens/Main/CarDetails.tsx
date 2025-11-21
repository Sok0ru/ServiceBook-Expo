    import React, { useState, useEffect } from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList, Car, Reminder } from '../../types/navigation';
    import { carsAPI } from '../../api/cars';
    import { remindersAPI } from '../../api/reminders';

    type CarDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;
    type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

    type Props = {
    navigation: CarDetailsScreenNavigationProp;
    };

    const safeDate = (iso?: number): string => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? ''
        : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    };

    export default function CarDetails({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isTablet } = useAdaptiveStyles();
    const route = useRoute<CarDetailsRouteProp>();
    const nav = useNavigation<CarDetailsScreenNavigationProp>();

    const carId = route.params?.carId;

    const [car, setCar] = useState<Car | null>(null);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loading, setLoading] = useState(true);

    const loadCarData = async () => {
        if (!carId) {
        Alert.alert('Ошибка', 'Не выбран автомобиль');
        navigation.goBack();
        return;
        }

        try {
        setLoading(true);
        const cars = await carsAPI.list();
        const currentCar = cars.find(c => c.id === carId);
        if (!currentCar) {
            Alert.alert('Ошибка', 'Автомобиль не найден');
            navigation.goBack();    
            return;
        }
        setCar(currentCar);

        const response = await remindersAPI.getByCar(carId);
        const remindersData = response || [];
        setReminders(remindersData);
        } catch (e: any) {
        console.error('❌ Ошибка загрузки данных:', e);
        Alert.alert('Ошибка', 'Не удалось загрузить данные автомобиля');
        } finally {
        setLoading(false);
        }
    };
    console.log('🔍 CarDetails - текущие напоминания:', reminders);
    console.log('🔍 CarDetails - активные:', reminders.filter(r => r.active));
    console.log('🔍 CarDetails - неактивные:', reminders.filter(r => !r.active));

    useEffect(() => {
        loadCarData();
    }, [carId]);

    const handleCreateReminder = () => {
        if (car) navigation.navigate('CreateReminder', { carId: car.id });
    };

        const handleEditReminder = (reminder: Reminder) => {
            navigation.navigate('CreateReminder', {
            carId: carId,
            editReminder: {
                id: reminder.id,
                name: reminder.name,
                tag: reminder.tag,
                noticeType: reminder.noticeType,
                mileageNotice: reminder.mileageNotice,
                dateNotice: reminder.dateNotice,
                active: true,
                carId: '',
                type: reminder.type 
            },
            });
        };

    const handleToggleReminder = async (reminder: Reminder) => {
        const newActive = !reminder.active;
        
        try {
            // ✅ ПЕРЕДАЕМ НОВОЕ СОСТОЯНИЕ В ЗАПРОСЕ
            await remindersAPI.active(carId, reminder.id, newActive);
            
            setReminders(prev => prev.map(r => 
                r.id === reminder.id ? { ...r, active: newActive } : r
            ));
            
        } catch (e: any) {
            console.error('❌ Ошибка переключения:', e);
            Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось обновить');
            
            setReminders(prev => prev.map(r => 
                r.id === reminder.id ? { ...r, active: reminder.active } : r
            ));
        }
    };
    
    const handleDeleteReminder = (reminder: Reminder) => {
        Alert.alert('Удалить напоминание?', `Вы уверены, что хотите удалить "${reminder.name}"?`, [
        { text: 'Отмена', style: 'cancel' },
        {
            text: 'Удалить',
            style: 'destructive',
            onPress: async () => {
            try {
                await remindersAPI.delete(carId, reminder.id);
                setReminders(prev => prev.filter(r => r.id !== reminder.id));
            } catch (e: any) {
                Alert.alert('Ошибка', 'Не удалось удалить напоминание');
            }
            },
        },
        ]);
    };

    if (loading) {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, adaptiveStyles.textSm]}>Загрузка данных...</Text>
            </View>
        </SafeAreaView>
        );
    }

    if (!car) {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.errorContainer}>
            <Text style={[styles.errorText, adaptiveStyles.textMd]}>Автомобиль не найден</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={[styles.backButtonText, adaptiveStyles.textSm]}>Назад</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        );
    }

    const activeReminders = reminders.filter(r => r.active);
    const inactiveReminders = reminders.filter(r => !r.active);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={[styles.carHeader, adaptiveStyles.card]}>
            <Text style={[styles.carTitle, adaptiveStyles.textLg]}>{car.brand} {car.model}</Text>
            <Text style={[styles.carInfo, adaptiveStyles.textSm]}>{car.plate || 'Гос. номер не указан'} • {car.mileage?.toLocaleString() || '0'} км</Text>
            <Text style={[styles.carVin, adaptiveStyles.textXs]}>VIN: {car.vin || 'не указан'} • Год: {car.year || 'не указан'} • Цвет: {car.color || 'не указан'}</Text>
            </View>

            {activeReminders.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>АКТИВНЫЕ НАПОМИНАНИЯ</Text>
                {activeReminders.map(r => (
                <View key={r.id} style={[styles.componentCard, adaptiveStyles.card, isTablet && styles.componentCardTablet]}>
                    <Text style={[styles.componentName, adaptiveStyles.textMd]}>{r.name}</Text>
                    <Text style={[styles.componentTag, adaptiveStyles.textSm]}>🏷 {r.tag}</Text>
                    <Text style={[styles.componentStatus, adaptiveStyles.textSm]}>
                    {r.noticeType === 'mileage' ? `📏 ${r.mileageNotice?.toLocaleString()} км` : `📅 ${safeDate(r.dateNotice)}`}
                    </Text>
                    <View style={styles.reminderActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleEditReminder(r)}>
                        <Text style={[styles.actionButtonText, adaptiveStyles.textSm]}>Редактировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryActionButton} onPress={() => handleToggleReminder(r)}>
                        <Text style={[styles.secondaryActionButtonText, adaptiveStyles.textSm]}>Отключить</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                ))}
            </View>
            )}

            {inactiveReminders.length > 0 && (
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>НЕАКТИВНЫЕ НАПОМИНАНИЯ</Text>
                {inactiveReminders.map(r => (
                <View key={r.id} style={[styles.componentCard, styles.inactiveCard, adaptiveStyles.card, isTablet && styles.componentCardTablet]}>
                    <Text style={[styles.componentName, styles.inactiveText, adaptiveStyles.textMd]}>{r.name}</Text>
                    <Text style={[styles.componentTag, styles.inactiveText, adaptiveStyles.textSm]}>🏷 {r.tag}</Text>
                    <Text style={[styles.componentStatus, styles.inactiveText, adaptiveStyles.textSm]}>{r.noticeType === 'mileage' ? `📏 ${r.mileageNotice?.toLocaleString()} км` : `📅 ${safeDate(r.dateNotice)}`}</Text>
                    <View style={styles.reminderActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleEditReminder(r)}>
                        <Text style={[styles.actionButtonText, adaptiveStyles.textSm]}>Редактировать</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryActionButton} onPress={() => handleToggleReminder(r)}>
                        <Text style={[styles.secondaryActionButtonText, adaptiveStyles.textSm]}>Включить</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                ))}
            </View>
            )}

            {reminders.length === 0 && (
            <View style={styles.emptySection}>
                <Text style={[styles.emptyTitle, adaptiveStyles.textMd]}>Нет напоминаний</Text>
                <Text style={[styles.emptySubtitle, adaptiveStyles.textSm]}>Создайте первое напоминание для отслеживания обслуживания</Text>
            </View>
            )}

            <TouchableOpacity style={[styles.quickActionButton, adaptiveStyles.card]} onPress={handleCreateReminder}>
            <Text style={[styles.quickActionText, adaptiveStyles.textMd]}>+ Добавить напоминание</Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f3f3ff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 16, color: '#666' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    errorText: { color: '#666', marginBottom: 20, textAlign: 'center' },
    backButton: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
    backButtonText: { color: '#fff', fontWeight: '600' },
    content: { flex: 1, paddingHorizontal: 16 },
    scrollContent: { paddingVertical: 16 },
    carHeader: { padding: 16, marginBottom: 16, backgroundColor: 'white', borderRadius: 12, elevation: 3 },
    carTitle: { fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
    carInfo: { marginBottom: 4, color: '#666' },
    carVin: { color: '#999' },
    section: { marginBottom: 24 },
    sectionTitle: { fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a', textTransform: 'uppercase' },
    componentsGrid: { marginTop: 8 },
    componentCard: { padding: 16, marginBottom: 12, backgroundColor: 'white', borderRadius: 12, elevation: 2 },
    componentCardTablet: { width: '48%', marginHorizontal: '1%' },
    inactiveCard: { backgroundColor: '#f8f8f8', borderColor: '#e0e0e0', borderWidth: 1 },
    componentName: { fontWeight: '600', marginBottom: 4, color: '#1a1a1a' },
    componentTag: { marginBottom: 4, color: '#007AFF' },
    componentStatus: { marginBottom: 12, color: '#666' },
    inactiveText: { color: '#999' }, // ✅ Исправлено
    reminderActions: { flexDirection: 'row', gap: 8 },
    actionButton: { backgroundColor: '#007AFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
    actionButtonText: { color: '#fff', fontWeight: '500' },
    secondaryActionButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: '#666' },
    secondaryActionButtonText: { color: '#666', fontWeight: '500' },
    emptySection: { alignItems: 'center', paddingVertical: 40, marginBottom: 24 },
    emptyTitle: { color: '#666', marginBottom: 8 },
    emptySubtitle: { color: '#999', textAlign: 'center' },
    quickActionButton: { padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12 },
    quickActionText: { fontWeight: '500', color: '#007AFF' },
    });