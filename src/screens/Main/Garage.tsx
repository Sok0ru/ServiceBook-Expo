    import React, { useEffect, useState } from 'react';
    import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { carsAPI } from '../../api/cars';
    import { RootStackParamList, Car, MainTabParamList } from '../../types/navigation';
    import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

    type NavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'>;
    type GarageNavProp = BottomTabNavigationProp<MainTabParamList, 'Garage'>;
    type RootNav = StackNavigationProp<RootStackParamList>;
    
    export default function Garage() {
    const navigation = useNavigation<RootNav>();  
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    const loadCars = async () => {
        try {
        const data = await carsAPI.list();
        setCars(data);
        } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось загрузить машины');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        const unsub = navigation.addListener('focus', loadCars);
        return unsub;
    }, [navigation]);

    const handleDelete = (id: string) => {
        Alert.alert('Удалить?', 'Это действие нельзя отменить', [
        { text: 'Отмена' },
        {
            text: 'Удалить',
            onPress: async () => {
            try {
                await carsAPI.delete(id);
                setCars((prev) => prev.filter((c) => c.id !== id));
            } catch (e: any) {
                Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось удалить');
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
        onPress={() => navigation.navigate('CarDetails', { carId: item.id })}
        >
        <View style={styles.row}>
            <Text style={[styles.brand, adaptiveStyles.textMd]}>{item.brand}</Text>
            <Text style={[styles.model, adaptiveStyles.textSm]}>{item.model}</Text>
        </View>
        <Text style={[styles.meta, adaptiveStyles.textXs]}>{item.year} • {item.mileage} км</Text>
        <TouchableOpacity style={styles.delete} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>Удалить</Text>
        </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

    return (
        <View style={[styles.container, adaptiveStyles.container]}>
        <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={[styles.headerTitle, adaptiveStyles.textLg]}>Гараж</Text>
            <Text style={[styles.headerSub, adaptiveStyles.textSm]}>Ваши автомобили</Text>
        </View>

        <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            numColumns={isTablet ? 2 : 1}
        />

            <TouchableOpacity
            style={[styles.fab, isTablet && styles.fabTablet]}
            onPress={() => (navigation as any).navigate('AddCarStack')}
            >
            <Text style={styles.fabText}>+ Добавить</Text>
            </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { paddingVertical: 16, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    headerTitle: { fontWeight: 'bold', color: '#1a1a1a' },
    headerSub: { color: '#666' },
    list: { padding: 16, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    cardTablet: { width: '48%', marginHorizontal: '1%' },
    row: { flex: 1 },
    brand: { fontWeight: '600', color: '#1a1a1a' },
    model: { color: '#666' },
    meta: { color: '#999', marginTop: 4 },
    delete: { padding: 8 },
    deleteText: { color: '#FF3B30', fontWeight: '500' },
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
    fabTablet: { bottom: 32, right: 32, paddingVertical: 16, paddingHorizontal: 24 },
    fabText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
    });