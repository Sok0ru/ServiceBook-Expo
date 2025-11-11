    // src/screens/Main/CarDetails.tsx
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
    CreateReminder: undefined;
    History: undefined;
    };

    type CarDetailsScreenNavigationProp = StackNavigationProp<MainStackParamList, 'CarDetails'>;

    type Props = {
    navigation: CarDetailsScreenNavigationProp;
    };

    export default function CarDetails({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

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
        ],
    };

    const criticalComponents = carData.components.filter((c) => c.critical);
    const normalComponents = carData.components.filter((c) => !c.critical);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Заголовок автомобиля */}
            <View style={[styles.carHeader, adaptiveStyles.card]}>
            <Text style={[styles.carTitle, adaptiveStyles.textLg]}>{carData.model}</Text>
            <Text style={[styles.carInfo, adaptiveStyles.textSm]}>
                {carData.plate} • {carData.mileage}
            </Text>
            <Text style={[styles.carVin, adaptiveStyles.textXs]}>VIN: {carData.vin}</Text>
            </View>

            {/* Критические компоненты */}
            <View style={styles.section}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>КРИТИЧЕСКИЕ КОМПОНЕНТЫ</Text>
            <Text style={[styles.sectionSubtitle, adaptiveStyles.textXs]}>Требуют немедленного внимания</Text>

            <View
                style={[
                styles.componentsGrid,
                {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: adaptiveValues.spacing.md,
                },
                ]}
            >
                {criticalComponents.map((component, index) => (
                <View
                    key={index}
                    style={[
                    styles.componentCard,
                    styles.criticalCard,
                    adaptiveStyles.card,
                    isTablet && styles.componentCardTablet,
                    ]}
                >
                    <Text style={[styles.componentName, adaptiveStyles.textMd]}>{component.name}</Text>
                    <Text style={[styles.componentStatus, adaptiveStyles.textSm]}>{component.status}</Text>
                    <TouchableOpacity style={styles.actionButton}>
                    <Text style={[styles.actionButtonText, adaptiveStyles.textSm]}>Запланировать ремонт</Text>
                    </TouchableOpacity>
                </View>
                ))}
            </View>
            </View>

            {/* Обычные компоненты */}
            <View style={styles.section}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>РЕКОМЕНДУЕМЫЕ РАБОТЫ</Text>

            <View
                style={[
                styles.componentsGrid,
                {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: adaptiveValues.spacing.md,
                },
                ]}
            >
                {normalComponents.map((component, index) => (
                <View
                    key={index}
                    style={[
                    styles.componentCard,
                    adaptiveStyles.card,
                    isTablet && styles.componentCardTablet,
                    ]}
                >
                    <Text style={[styles.componentName, adaptiveStyles.textMd]}>{component.name}</Text>
                    <Text style={[styles.componentStatus, adaptiveStyles.textSm]}>{component.status}</Text>
                    <TouchableOpacity style={styles.secondaryActionButton}>
                    <Text style={[styles.secondaryActionButtonText, adaptiveStyles.textSm]}>Отложить</Text>
                    </TouchableOpacity>
                </View>
                ))}
            </View>
            </View>

            {/* Быстрые действия */}
            <View
            style={[
                styles.quickActions,
                {
                flexDirection: isTablet ? 'row' : 'column',
                gap: adaptiveValues.spacing.md,
                },
            ]}
            >
            <TouchableOpacity
                style={[styles.quickActionButton, adaptiveStyles.card, isTablet && styles.quickActionButtonTablet]}
                onPress={() => navigation.navigate('CreateReminder')}
            >
                <Text style={[styles.quickActionText, adaptiveStyles.textMd]}>Добавить напоминание</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.quickActionButton, adaptiveStyles.card, isTablet && styles.quickActionButtonTablet]}
                onPress={() => navigation.navigate('History')}
            >
                <Text style={[styles.quickActionText, adaptiveStyles.textMd]}>История обслуживания</Text>
            </TouchableOpacity>
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
        backgroundColor: '#f3f3f3ff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingVertical: 16,
    },
    carHeader: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    carTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    carInfo: {
        marginBottom: 4,
        color: '#999',
    },
    carVin: {
        color: '#999',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
        textTransform: 'uppercase',
    },
    sectionSubtitle: {
        marginBottom: 16,
        color: '#FF3B30',
        fontWeight: '500',
    },
    componentsGrid: {
        marginTop: 8,
    },
    componentCard: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    componentCardTablet: {
        width: '48%',
    },
    criticalCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#FF3B30',
    },
    componentName: {
        fontWeight: '600',
        marginBottom: 4,
        color: '#1a1a1a',
    },
    componentStatus: {
        marginBottom: 12,
        color: '#FF3B30',
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
        fontWeight: '500',
    },
    quickActions: {
        marginTop: 16,
    },
    quickActionButton: {
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    quickActionButtonTablet: {
        flex: 1,
    },
    quickActionText: {
        fontWeight: '500',
        color: '#007AFF',
    },
    });