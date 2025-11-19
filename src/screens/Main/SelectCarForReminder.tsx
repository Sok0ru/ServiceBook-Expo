    import React, { useEffect, useState } from 'react';
    import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useNavigation } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { carsAPI } from '../../api/cars';
    import { Car, RootStackParamList } from '../../types/navigation';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';

    type NavProp = StackNavigationProp<RootStackParamList, 'SelectCarForReminder'>;

    export default function SelectCarForReminder() {
    const nav = useNavigation<NavProp>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCars = async () => {
        try {
            const data = await carsAPI.list();
            setCars(data);
        } catch (e) {
            console.warn('Ошибка загрузки машин', e);
        } finally {
            setLoading(false);
        }
        };
        loadCars();
    }, []);

    const handleSelect = (car: Car) => {
        nav.navigate('CreateReminder', { carId: car.id });
    };

    const renderItem = ({ item }: { item: Car }) => (
        <TouchableOpacity style={[styles.card, isTablet && styles.cardTablet]} onPress={() => handleSelect(item)}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.model}>{item.model}</Text>
        {item.plate && <Text style={styles.plate}>Номер: {item.plate}</Text>}
        </TouchableOpacity>
    );

    if (loading) {
        return (
        <SafeAreaView style={styles.center}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text>Загрузка машин...</Text>
        </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
        <Text style={[styles.title, adaptiveStyles.textXl]}>Выберите автомобиль</Text>
        <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            numColumns={isTablet ? 2 : 1}
        />
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    list: { paddingBottom: 20 },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
    },
    cardTablet: { width: '48%', marginHorizontal: '1%' },
    brand: { fontWeight: '600', fontSize: 16 },
    model: { color: '#666', marginTop: 4 },
    plate: { color: '#999', fontSize: 12, marginTop: 4 },
    });