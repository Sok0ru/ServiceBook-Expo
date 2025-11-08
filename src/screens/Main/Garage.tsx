    import React from 'react';
    import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';

    export default function Garage(props: any) {
    const { navigation } = props;

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
            {/* Список автомобилей */}
            {cars.map((car) => (
            <TouchableOpacity 
                key={car.id} 
                style={styles.carCard}
                onPress={() => navigation.navigate('CarDetails')}
            >
                <Text style={styles.carModel}>{car.model}</Text>
                <Text style={styles.carPlate}>{car.plate}</Text>
                <Text style={styles.carMileage}>{car.mileage}</Text>
                
                {/* Статус автомобиля */}
                <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Активный</Text>
                </View>
            </TouchableOpacity>
            ))}

            {/* Кнопка добавления автомобиля */}
            <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: '#32CD32' }]}
            onPress={() => navigation.navigate('AddCar')}
            >
            <Text style={styles.addButtonText}>+ Добавить автомобиль</Text>
            </TouchableOpacity>

            {/* Дополнительные действия */}
            <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('Reminders')}
            >
                <Text style={styles.actionButtonText}>Напоминания</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('History')}
            >
                <Text style={styles.actionButtonText}>История обслуживания</Text>
            </TouchableOpacity>
            </View>

            {/* Информационный блок */}
            <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Совет</Text>
            <Text style={styles.infoText}>
                Добавляйте автомобили для отслеживания их обслуживания и получения напоминаний
            </Text>
            </View>

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
        position: 'relative',
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
    statusBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#E8F5E8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '500',
    },
    addButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionButtonText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976D2',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#424242',
        lineHeight: 20,
    },
    });