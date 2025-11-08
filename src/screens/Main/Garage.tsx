    import React from 'react';
    import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { wp, hp, fontSize, spacing, isTablet } from '../../utils/responsive';

    const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

    const numColumns = isTablet ? 2 : 1;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <Text style={styles.title}>Гараж</Text>
            <Text style={styles.subtitle}>Ваши автомобили</Text>
        </View>

        <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Список автомобилей с адаптивной сеткой */}
            <View style={[styles.carsContainer, { flexDirection: isTablet ? 'row' : 'column', flexWrap: isTablet ? 'wrap' : 'nowrap' }]}>
            {cars.map((car) => (
                <View 
                key={car.id} 
                style={[
                    styles.carCardWrapper,
                    isTablet && { width: '48%', marginRight: '4%', marginBottom: spacing.md }
                ]}
                >
                <TouchableOpacity 
                    style={styles.carCard}
                    onPress={() => navigation.navigate('CarDetails')}
                >
                    <Text style={styles.carModel}>{car.model}</Text>
                    <Text style={styles.carPlate}>{car.plate}</Text>
                    <Text style={styles.carMileage}>{car.mileage}</Text>
                    
                    <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Активный</Text>
                    </View>
                </TouchableOpacity>
                </View>
            ))}
            </View>

            {/* Кнопка добавления автомобиля */}
            <TouchableOpacity 
            style={styles.addButton}
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
                <Text style={styles.actionButtonText}> Напоминания</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('History')}
            >
                <Text style={styles.actionButtonText}> История обслуживания</Text>
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
        paddingVertical: hp(2.5),
        paddingHorizontal: wp(5),
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: fontSize(28),
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: hp(1),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSize(16),
        color: '#666',
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
    },
    carsContainer: {
        marginBottom: hp(2),
    },
    carCardWrapper: {
        marginBottom: hp(1.5),
    },
    carCard: {
        backgroundColor: 'white',
        padding: wp(4),
        borderRadius: wp(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        position: 'relative',
        minHeight: hp(12),
    },
    carModel: {
        fontSize: fontSize(18),
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: hp(0.5),
    },
    carPlate: {
        fontSize: fontSize(16),
        color: '#666',
        marginBottom: hp(0.5),
    },
    carMileage: {
        fontSize: fontSize(14),
        color: '#999',
    },
    statusBadge: {
        position: 'absolute',
        top: wp(4),
        right: wp(4),
        backgroundColor: '#E8F5E8',
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: wp(3),
    },
    statusText: {
        fontSize: fontSize(12),
        color: '#2E7D32',
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: '#32CD32',
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        borderRadius: wp(3),
        alignItems: 'center',
        marginBottom: hp(2),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: 'white',
        fontSize: fontSize(16),
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(2),
        gap: wp(3),
    },
    actionButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: wp(4),
        borderRadius: wp(3),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        minHeight: hp(8),
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: fontSize(14),
        color: '#007AFF',
        fontWeight: '500',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        padding: wp(4),
        borderRadius: wp(3),
        borderLeftWidth: wp(1),
        borderLeftColor: '#2196F3',
    },
    infoTitle: {
        fontSize: fontSize(16),
        fontWeight: '600',
        color: '#1976D2',
        marginBottom: hp(1),
    },
    infoText: {
        fontSize: fontSize(14),
        color: '#424242',
        lineHeight: fontSize(20),
    },
    });