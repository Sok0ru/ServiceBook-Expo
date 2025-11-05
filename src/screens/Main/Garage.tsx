    import React from 'react';
    import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';

    export default function Garage() {
    const cars = [
        {
        id: '1',
        model: 'SUBARU FORESTER',
        plate: 'K7770T555',
        mileage: '121404 км',
        },
        {
        id: '2', 
        model: 'TOYOTA CAMRY',
        plate: 'A123BC777',
        mileage: '85600 км',
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <Text style={styles.title}>Гараж</Text>
            <Text style={styles.subtitle}>Ваши автомобили</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {cars.map((car) => (
            <TouchableOpacity key={car.id} style={styles.carCard}>
                <Text style={styles.carModel}>{car.model}</Text>
                <Text style={styles.carPlate}>{car.plate}</Text>
                <Text style={styles.carMileage}>{car.mileage}</Text>
            </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Добавить автомобиль</Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    carCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    carModel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    carPlate: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    carMileage: {
        fontSize: 14,
        color: '#999',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    });