    // src/screens/Main/History.tsx
    import React, { useEffect, useState } from 'react';
    import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Modal
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { Reminder, Car } from '../../types/navigation';
    import { remindersAPI } from '../../api/reminders';
    import { carsAPI } from '../../api/cars';

    const safeDate = (ts?: number) => (ts ? new Date(ts).toLocaleDateString('ru-RU') : '—');

    export default function History() {
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showCarSelector, setShowCarSelector] = useState(false);

    // Загружаем список машин
    const loadCars = async () => {
        try {
        const carsData = await carsAPI.list();
        setCars(carsData);
        
        // Автоматически выбираем первую машину если есть
        if (carsData.length > 0 && !selectedCar) {
            setSelectedCar(carsData[0]);
        }
        } catch (e) {
        console.error('❌ Ошибка загрузки машин:', e);
        }
    };

    // Загружаем напоминания для выбранной машины
    const loadReminders = async (carId: string) => {
        try {
        setLoading(true);
        const remindersData = await remindersAPI.getByCar(carId);
        console.log('📋 Напоминания для машины:', remindersData);
        setReminders(Array.isArray(remindersData) ? remindersData : []);
        } catch (e) {
        console.error('❌ Ошибка загрузки напоминаний:', e);
        setReminders([]);
        } finally {
        setLoading(false);
        setRefreshing(false);
        }
    };

    useEffect(() => {
        loadCars();
    }, []);

    // При изменении выбранной машины загружаем её напоминания
    useEffect(() => {
        if (selectedCar) {
        loadReminders(selectedCar.id);
        }
    }, [selectedCar]);

    const onRefresh = () => {
        setRefreshing(true);
        if (selectedCar) {
        loadReminders(selectedCar.id);
        } else {
        setRefreshing(false);
        }
    };

    const handleCarSelect = (car: Car) => {
        setSelectedCar(car);
        setShowCarSelector(false);
    };

    const getCarDisplayName = (car: Car | null) => {
        if (!car) return 'Выберите автомобиль';
        return `${car.brand} ${car.model}${car.plate ? ` • ${car.plate}` : ''}`;
    };

    if (loading && !refreshing) {
        return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, adaptiveStyles.textSm]}>
                Загрузка истории...
            </Text>
            </View>
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        {/* Заголовок с выбором машины */}
        <View style={styles.header}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>История напоминаний</Text>
            
            <TouchableOpacity 
            style={styles.carSelector}
            onPress={() => setShowCarSelector(true)}
            >
            <Text style={[styles.carSelectorText, adaptiveStyles.textMd]}>
                {getCarDisplayName(selectedCar)}
            </Text>
            <Text style={[styles.carSelectorHint, adaptiveStyles.textXs]}>
                Нажмите для выбора авто ▼
            </Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={reminders}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.content}
            refreshControl={
            <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={['#007AFF']}
            />
            }
            renderItem={({ item }) => (
            <View style={[
                styles.card, 
                adaptiveStyles.card, 
                isTablet && styles.cardTablet,
                !item.active && styles.inactiveCard
            ]}>
                <View style={styles.row}>
                <Text style={[styles.name, adaptiveStyles.textMd]}>{item.name}</Text>
                <Text style={[styles.tag, adaptiveStyles.textSm]}>{item.tag}</Text>
                </View>
                
                <View style={styles.detailRow}>
                {item.noticeType === 'mileage' && item.mileageNotice && (
                    <Text style={styles.detail}>📏 {item.mileageNotice.toLocaleString()} км</Text>
                )}
                {item.noticeType === 'date' && item.dateNotice && (
                    <Text style={styles.detail}>📅 {safeDate(item.dateNotice)}</Text>
                )}
                </View>

                {/* Статус активности */}
                <View style={styles.statusRow}>
                <View style={[
                    styles.statusBadge,
                    item.active ? styles.activeBadge : styles.inactiveBadge
                ]}>
                    <Text style={styles.statusText}>
                    {item.active ? 'АКТИВНО' : 'НЕАКТИВНО'}
                    </Text>
                </View>
                </View>
            </View>
            )}
            ListEmptyComponent={
            <View style={styles.empty}>
                <Text style={[styles.emptyText, adaptiveStyles.textMd]}>
                {selectedCar ? 'Нет напоминаний' : 'Выберите автомобиль'}
                </Text>
                <Text style={[styles.emptySubtext, adaptiveStyles.textSm]}>
                {selectedCar 
                    ? 'Создайте первое напоминание для этого автомобиля' 
                    : 'Для просмотра истории выберите автомобиль из списка'
                }
                </Text>
            </View>
            }
        />

        {/* Модальное окно выбора машины */}
        <Modal
            visible={showCarSelector}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowCarSelector(false)}
        >
            <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, isTablet && styles.modalContentTablet]}>
                <Text style={[styles.modalTitle, adaptiveStyles.textLg]}>Выберите автомобиль</Text>
                
                <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={[
                        styles.carOption,
                        selectedCar?.id === item.id && styles.carOptionSelected
                    ]}
                    onPress={() => handleCarSelect(item)}
                    >
                    <View style={styles.carOptionInfo}>
                        <Text style={[styles.carOptionTitle, adaptiveStyles.textMd]}>
                        {item.brand} {item.model}
                        </Text>
                        <Text style={[styles.carOptionDetails, adaptiveStyles.textSm]}>
                        {item.year || 'Год не указан'} • {item.mileage?.toLocaleString() || '0'} км
                        {item.plate && ` • ${item.plate}`}
                        </Text>
                    </View>
                    {selectedCar?.id === item.id && (
                        <Text style={[styles.selectedIndicator, adaptiveStyles.textSm]}>✓</Text>
                    )}
                    </TouchableOpacity>
                )}
                style={styles.carList}
                />
                
                <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowCarSelector(false)}
                >
                <Text style={[styles.modalCloseText, adaptiveStyles.textMd]}>Закрыть</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f5f5f5' 
    },
    loadingContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    loadingText: { 
        marginTop: 16, 
        color: '#666' 
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    title: { 
        fontWeight: 'bold', 
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 12
    },
    carSelector: {
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8f9ff',

    },
    carSelectorText: {
        fontWeight: '600',
        color: '#007AFF',
        textAlign: 'center'
    },
    carSelectorHint: {
        color: '#007AFF',
        marginTop: 4,
        fontStyle: 'italic'
    },
    content: { 
        padding: 16 
    },
    card: { 
        padding: 16, 
        marginBottom: 12, 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        elevation: 2 
    },
    cardTablet: { 
        width: '48%', 
        marginHorizontal: '1%' 
    },
    inactiveCard: {
        backgroundColor: '#f8f8f8',
        borderColor: '#e0e0e0',
        borderWidth: 1
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    name: { 
        fontWeight: '600', 
        color: '#1a1a1a',
        flex: 1,
        marginRight: 12
    },
    tag: { 
        color: '#007AFF' 
    },
    detailRow: { 
        marginBottom: 8 
    },
    detail: { 
        color: '#666', 
        fontSize: 12 
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
    },
    activeBadge: {
        backgroundColor: '#34C759'
    },
    inactiveBadge: {
        backgroundColor: '#8E8E93'
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600'
    },
    empty: { 
        alignItems: 'center', 
        paddingVertical: 60 
    },
    emptyText: { 
        textAlign: 'center', 
        color: '#666', 
        marginBottom: 8 
    },
    emptySubtext: { 
        textAlign: 'center', 
        color: '#999' 
    },
    // Стили для модального окна
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%'
    },
    modalContentTablet: {
        maxWidth: 500,
        alignSelf: 'center',
        borderRadius: 20,
        width: '90%'
    },
    modalTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1a1a1a'
    },
    carList: {
        maxHeight: 400
    },
    carOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    carOptionSelected: {
        backgroundColor: '#f8f9ff'
    },
    carOptionInfo: {
        flex: 1
    },
    carOptionTitle: {
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4
    },
    carOptionDetails: {
        color: '#666'
    },
    selectedIndicator: {
        color: '#007AFF',
        fontWeight: 'bold'
    },
    modalCloseButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16
    },
    modalCloseText: {
        color: '#fff',
        fontWeight: '600'
    }
    });