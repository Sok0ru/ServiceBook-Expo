    import React, { useEffect, useState } from 'react';
    import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, RefreshControl } from 'react-native';
    import { CommonActions, useNavigation, useFocusEffect } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { carsAPI } from '../../api/cars';
    import { RootStackParamList, Car, MainTabParamList } from '../../types/navigation';
    import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
    import { api } from '../../api/client';

    type NavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;
    type GarageNavProp = BottomTabNavigationProp<MainTabParamList, 'Garage'>;
    type RootNav = StackNavigationProp<RootStackParamList>;

    export default function Garage() {
        const navigation = useNavigation<RootNav>();  
        const { adaptiveStyles, isTablet } = useAdaptiveStyles();
        const [cars, setCars] = useState<Car[]>([]);
        const [loading, setLoading] = useState(true);
        const [refreshing, setRefreshing] = useState(false);

        const testDeleteEndpoint = async (carId: string) => {
            console.log('🔍 Тестирую endpoint удаления для carId:', carId);
            
            try {
                // Попробуем разные варианты endpoints
                const endpoints = [
                    `/cars/${carId}`,
                    `/cars/delete/${carId}`,
                    `/cars/remove/${carId}`,
                    `/cars/destroy/${carId}`
                ];
                
                return null;
            } catch (error) {
                console.error('Ошибка тестирования:', error);
                return null;
            }
        };        

        const handleFab = () => {
            (navigation as any).navigate('AddCarStack', { screen: 'AddCar' });
        };

        const loadCars = async () => {
            try {
                console.log('🔄 Загружаю список автомобилей...');
                const carsData = await carsAPI.list();
                console.log('✅ Получены автомобили:', carsData);
                setCars(carsData);
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось загрузить список автомобилей');
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        };

        // Загрузка при монтировании
        useEffect(() => {
            loadCars();
        }, []);

        // Обновление при фокусе на экране
        useFocusEffect(
            React.useCallback(() => {
                console.log('🎯 Экран Garage получил фокус, обновляю данные...');
                loadCars();
            }, [])
        );

        // Pull-to-refresh
        const onRefresh = () => {
            setRefreshing(true);
            loadCars();
        };

            const handleDelete = async (id: string) => {
        Alert.alert('Удалить автомобиль?', 'Это действие нельзя отменить', [
            { text: 'Отмена', style: 'cancel' },
            {
                text: 'Удалить',
                style: 'destructive',
                onPress: async () => {
                    try {
                        console.log('🗑️ Удаляю автомобиль ID:', id);
                        
                        // 🔴 РАСКОММЕНТИРУЙТЕ КОГДА ENDPOINT БУДЕТ ИЗВЕСТЕН:
                        await carsAPI.delete(id);
                        console.log('✅ Автомобиль удален с сервера');
                        
                        // Удаляем из локального состояния
                        setCars((prev) => prev.filter((c) => c.id !== id));
                        
                        Alert.alert('Успешно', 'Автомобиль удален');
                        
                    } catch (e: any) {
                        console.error('❌ Ошибка удаления:', e);
                        
                        // Детали ошибки
                        console.log('🔍 Детали ошибки:', {
                            status: e.response?.status,
                            data: e.response?.data,
                            url: e.response?.config?.url,
                        });
                        
                        Alert.alert(
                            'Ошибка удаления', 
                            e.response?.data?.message || 'Не удалось удалить автомобиль'
                        );
                    }
                },
            },
        ]);
    };
        const handlePress = (carId: string) => {
            navigation.navigate('CarDetails', { carId }); 
        };

        const renderItem = ({ item }: { item: Car }) => (
            <TouchableOpacity
                style={[styles.card, isTablet && styles.cardTablet]}
                onPress={() => handlePress(item.id)}
            >
                <View style={styles.cardContent}>
                    <View style={styles.row}>
                        <Text style={[styles.brand, adaptiveStyles.textMd]}>{item.brand}</Text>
                        <Text style={[styles.model, adaptiveStyles.textSm]}>{item.model}</Text>
                    </View>
                    
                    <View style={styles.details}>
                        {item.year && (
                            <Text style={[styles.meta, adaptiveStyles.textXs]}>Год: {item.year}</Text>
                        )}
                        {item.mileage && (
                            <Text style={[styles.meta, adaptiveStyles.textXs]}>Пробег: {item.mileage} км</Text>
                        )}
                        {item.plate && (
                            <Text style={[styles.meta, adaptiveStyles.textXs]}>Номер: {item.plate}</Text>
                        )}
                        {item.color && (
                            <Text style={[styles.meta, adaptiveStyles.textXs]}>Цвет: {item.color}</Text>
                        )}
                    </View>
                </View>
                
                <TouchableOpacity 
                    style={styles.delete} 
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.deleteText}>Удалить</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );

        if (loading) {
            return (
                <View style={[styles.container, styles.center]}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={[styles.loadingText, adaptiveStyles.textSm]}>Загрузка автомобилей...</Text>
                </View>
            );
        }

        return (
            <View style={[styles.container, adaptiveStyles.container]}>
                <View style={[styles.header, adaptiveStyles.container]}>
                    <Text style={[styles.headerTitle, adaptiveStyles.textLg]}>Гараж</Text>
                    <Text style={[styles.headerSub, adaptiveStyles.textSm]}>
                        {cars.length} автомобилей
                    </Text>
                </View>

                <FlatList
                    data={cars}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[
                        styles.list,
                        cars.length === 0 && styles.emptyList
                    ]}
                    numColumns={isTablet ? 2 : 1}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#007AFF']}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={[styles.emptyText, adaptiveStyles.textMd]}>
                                В гараже пока нет автомобилей
                            </Text>
                            <Text style={[styles.emptySubtext, adaptiveStyles.textSm]}>
                                Добавьте первый автомобиль, нажав на кнопку ниже
                            </Text>
                            <TouchableOpacity 
                            style={styles.debugButton}
                            onPress={async () => {
                                console.log('🔍 Проверяю API endpoints...');
                                try {
                                    const cars = await carsAPI.list();
                                    console.log('✅ GET /cars работает:', cars);
                                } catch (error) {
                                    console.error('❌ GET /cars не работает:', error);
                                }
                            }}
                        >
                        </TouchableOpacity>
                        </View>
                    }
                />

                <TouchableOpacity 
                    style={[styles.fab, isTablet && styles.fabTablet]} 
                    onPress={handleFab}
                >
                    <Text style={styles.fabText}>+ Добавить</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            backgroundColor: '#f5f5f5' 
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        header: { 
            paddingVertical: 16, 
            marginTop: 40, 
            marginHorizontal: 0,
            backgroundColor: '#ffffff', 
            borderBottomWidth: 1, 
            borderBottomColor: '#e0e0e0' 
        },
        headerTitle: { 
            fontWeight: 'bold', 
            color: '#1a1a1a' 
        },
        headerSub: { 
            color: '#666' 
        },
        list: { 
            padding: 16, 
            paddingBottom: 100 
        },
        emptyList: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        card: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 16,
            marginBottom: 12,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        cardTablet: { 
            width: '48%', 
            marginHorizontal: '1%' 
        },
        cardContent: {
            flex: 1,
        },
        row: { 
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        brand: { 
            fontWeight: '600', 
            color: '#1a1a1a',
            marginRight: 8,
        },
        model: { 
            color: '#666' 
        },
        details: {
            marginTop: 4,
        },
        meta: { 
            color: '#999', 
            marginBottom: 2,
        },
        delete: { 
            padding: 8,
            marginLeft: 8,
        },
        deleteText: { 
            color: '#FF3B30', 
            fontWeight: '500',
            fontSize: 12,
        },
        fab: {
            position: 'absolute',
            bottom: 24,
            right: 24,
            backgroundColor: '#007AFF',
            borderRadius: 28,
            paddingVertical: 14,
            paddingHorizontal: 20,
            shadowColor: '#007AFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        fabTablet: { 
            bottom: 32, 
            right: 32, 
            paddingVertical: 16, 
            paddingHorizontal: 24 
        },
        fabText: { 
            color: '#ffffff', 
            fontWeight: '600', 
            fontSize: 16 
        },
        loadingText: {
            marginTop: 16,
            color: '#666',
            textAlign: 'center',
        },
        emptyState: { 
            alignItems: 'center', 
            justifyContent: 'center', 
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
    });
