
    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type MainStackParamList = {
    CarDetails: undefined;
    AddCar: undefined;
    Reminders: undefined;
    History: undefined;
    };

    type GarageScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Garage'>;

    type Props = {
    navigation: GarageScreenNavigationProp;
    };

    export default function Garage({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

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
        <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Гараж</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Ваши автомобили</Text>
        </View>

        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Список автомобилей */}
            <View
            style={[
                styles.carsContainer,
                {
                flexDirection: isTablet ? 'row' : 'column',
                flexWrap: isTablet ? 'wrap' : 'nowrap',
                gap: adaptiveValues.spacing.lg,
                },
            ]}
            >
            {cars.map((car) => (
                <TouchableOpacity
                key={car.id}
                style={[
                    styles.carCard,
                    adaptiveStyles.card,
                    isTablet && styles.carCardTablet,
                ]}
                onPress={() => navigation.navigate('CarDetails')}
                >
                <Text style={[styles.carModel, adaptiveStyles.textMd]} numberOfLines={1}>
                    {car.model}
                </Text>
                <Text style={[styles.carPlate, adaptiveStyles.textSm]}>{car.plate}</Text>
                <Text style={[styles.carMileage, adaptiveStyles.textXs]}>{car.mileage}</Text>

                {/* Статус автомобиля */}
                <View style={styles.statusBadge}>
                    <Text style={[styles.statusText, adaptiveStyles.textXs]}>Активный</Text>
                </View>
                </TouchableOpacity>
            ))}
            </View>

            {/* Кнопка добавления автомобиля */}
            <TouchableOpacity
            style={[styles.addButton, { backgroundColor: '#007AFF' }]}
            onPress={() => navigation.navigate('AddCar')}
            >
            <Text style={[styles.addButtonText, adaptiveStyles.textMd]}>+ Добавить автомобиль</Text>
            </TouchableOpacity>

            {/* Дополнительные действия */}
            <View
            style={[
                styles.actionsContainer,
                {
                flexDirection: isTablet ? 'row' : 'column',
                gap: adaptiveValues.spacing.md,
                },
            ]}
            >
            <TouchableOpacity
                style={[styles.actionButton, adaptiveStyles.card, isTablet && styles.actionButtonTablet]}
                onPress={() => navigation.navigate('Reminders')}
            >
                <Text style={[styles.actionButtonText, adaptiveStyles.textSm]}>Напоминания</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.actionButton, adaptiveStyles.card, isTablet && styles.actionButtonTablet]}
                onPress={() => navigation.navigate('History')}
            >
                <Text style={[styles.actionButtonText, adaptiveStyles.textSm]}>История обслуживания</Text>
            </TouchableOpacity>
            </View>

            {/* Информационный блок */}
            <View style={[styles.infoCard, adaptiveStyles.card]}>
            <Text style={[styles.infoTitle, adaptiveStyles.textMd]}>💡 Совет</Text>
            <Text style={[styles.infoText, adaptiveStyles.textSm]}>
                Добавляйте автомобили для отслеживания их обслуживания и получения напоминаний
            </Text>
            </View>

            {/* Отступ для таб-бара */}
            <View style={{ height: 20 }} />
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
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        color: '#666',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingVertical: 16,
    },
    carsContainer: {
        marginBottom: 16,
    },
    carCard: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        position: 'relative',
    },
    carCardTablet: {
        width: '48%',
        marginBottom: 16,
    },
    carModel: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1a1a1a',
    },
    carPlate: {
        marginBottom: 4,
        color: '#666',
    },
    carMileage: {
        color: '#999',
    },
    statusBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#E8F5E8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#27AE60',
        fontWeight: '500',
    },
    addButton: {
        paddingVertical: 14,
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
        fontWeight: '600',
        color: 'white',
    },
    actionsContainer: {
        marginBottom: 16,
    },
    actionButton: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    actionButtonTablet: {
        flex: 1,
    },
    actionButtonText: {
        fontWeight: '500',
        color: '#007AFF',
        textAlign: 'center',
    },
    infoCard: {
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    infoTitle: {
        fontWeight: '600',
        marginBottom: 8,
        color: '#1976D2',
    },
    infoText: {
        color: '#424242',
        lineHeight: 20,
    },
    });