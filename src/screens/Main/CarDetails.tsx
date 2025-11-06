    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';

    type MainStackParamList = {
    CarDetails: undefined;
    Dashboard: undefined;
    Reminders: undefined;
    Filters: undefined;
    };

    type CarDetailsScreenNavigationProp = StackNavigationProp<
    MainStackParamList,
    'CarDetails'
    >;

    type Props = {
    navigation: CarDetailsScreenNavigationProp;
    };

    export default function CarDetails({ navigation }: Props) {
    const carData = {
        model: 'SUBARU FORESTER',
        plate: 'Й312ОУ154',
        vin: 'vinnebude',
        mileage: '121404 км',
        components: [
        { name: 'Форсунки', status: 'требуется замена или ремонт', critical: true },
        { name: 'Соленоид', status: 'требуется замена или ремонт', critical: true },
        { name: 'Ступица', status: 'требуется замена или ремонт', critical: true },
        { name: 'Крестовина кардана', status: 'требуется замена или ремонт', critical: false },
        ]
    };

    return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Заголовок автомобиля */}
            <View style={styles.carHeader}>
            <Text style={styles.carTitle}>{carData.model}</Text>
            <Text style={styles.carInfo}>{carData.plate} • {carData.mileage}</Text>
            <Text style={styles.carVin}>VIN: {carData.vin}</Text>
            </View>

            {/* Критические компоненты */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>КРИТИЧЕСКИЕ КОМПОНЕНТЫ</Text>
            <Text style={styles.sectionSubtitle}>Требуют немедленного внимания</Text>
            
            {carData.components
                .filter(component => component.critical)
                .map((component, index) => (
                <View key={index} style={[styles.componentCard, styles.criticalCard]}>
                    <Text style={styles.componentName}>{component.name}</Text>
                    <Text style={styles.componentStatus}>{component.status}</Text>
                    <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Запланировать ремонт</Text>
                    </TouchableOpacity>
                </View>
                ))
            }
            </View>

            {/* Обычные компоненты */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>РЕКОМЕНДУЕМЫЕ РАБОТЫ</Text>
            
            {carData.components
                .filter(component => !component.critical)
                .map((component, index) => (
                <View key={index} style={styles.componentCard}>
                    <Text style={styles.componentName}>{component.name}</Text>
                    <Text style={styles.componentStatus}>{component.status}</Text>
                    <TouchableOpacity style={styles.secondaryActionButton}>
                    <Text style={styles.secondaryActionButtonText}>Отложить</Text>
                    </TouchableOpacity>
                </View>
                ))
            }
            </View>

            {/* Быстрые действия */}
            <View style={styles.quickActions}>
            <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => navigation.navigate('CreateReminder')}
            >
                <Text style={styles.quickActionText}>Добавить напоминание</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => navigation.navigate('History')}
                >
                <Text style={styles.quickActionText}>История обслуживания</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, 
    },
    carHeader: {
        backgroundColor: '#f3f3f3ff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#f3f3f3ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    carTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    carInfo: {
        fontSize: 16,
        color: '#999',
        marginBottom: 4,
    },
    carVin: {
        fontSize: 14,
        color: '#999',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#FF3B30',
        marginBottom: 16,
        fontWeight: '500',
    },
    componentCard: {
        backgroundColor: '#f3f3f3ff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    criticalCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#FF3B30',
    },
    componentName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#1a1a1a',
    },
    componentStatus: {
        fontSize: 14,
        color: '#FF3B30',
        marginBottom: 12,
    },
    actionButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    actionButtonText: {
        color: '#f3f3f3ff',
        fontSize: 14,
        fontWeight: '500',
    },
    secondaryActionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1a1a1a',
        alignSelf: 'flex-start',
    },
    secondaryActionButtonText: {
        color: '#1a1a1a',
        fontSize: 14,
        fontWeight: '500',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickActionButton: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 4,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    quickActionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#007AFF',
        textAlign: 'center',
    },
    bottomSpacer: {
        height: 20, 
    },
    });