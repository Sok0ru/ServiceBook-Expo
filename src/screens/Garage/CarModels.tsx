    import React, { useState, useEffect } from 'react';
    import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RouteProp } from '@react-navigation/native';
    import { Ionicons } from '@expo/vector-icons';
    import { RootStackParamList } from '../../types/navigation';

    type CarModelsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CarModels'
    >;

    type CarModelsScreenRouteProp = RouteProp<RootStackParamList, 'CarModels'>;

    type Props = {
    navigation: CarModelsScreenNavigationProp;
    route: CarModelsScreenRouteProp;
    };
    export default function CarModels({ navigation, route }: Props) {
    const { brand } = route.params;
    const [models, setModels] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);

    // Мок данные моделей (заменим на парсинг с Дрома)
    const mockModels: { [key: string]: CarModel[] } = {
        'Toyota': [
        { id: '1', name: 'Camry', years: '1991-2024' },
        { id: '2', name: 'Corolla', years: '1966-2024' },
        { id: '3', name: 'RAV4', years: '1994-2024' },
        { id: '4', name: 'Land Cruiser', years: '1951-2024' },
        { id: '5', name: 'Highlander', years: '2000-2024' },
        ],
        'BMW': [
        { id: '6', name: '3 Series', years: '1975-2024' },
        { id: '7', name: '5 Series', years: '1972-2024' },
        { id: '8', name: 'X5', years: '1999-2024' },
        { id: '9', name: 'X3', years: '2003-2024' },
        ],
        'Subaru': [
        { id: '10', name: 'Forester', years: '1997-2024' },
        { id: '11', name: 'Outback', years: '1994-2024' },
        { id: '12', name: 'Impreza', years: '1992-2024' },
        ],
    };

    useEffect(() => {
        // Имитация загрузки данных
        setTimeout(() => {
        setModels(mockModels[brand] || []);
        setLoading(false);
        }, 1000);
    }, [brand]);

    const handleModelSelect = (model: CarModel) => {
        navigation.navigate('CarGeneration', {
        brand: brand,
        model: model.name
        });
    };

    const renderModelItem = ({ item }: { item: CarModel }) => (
        <TouchableOpacity
        style={styles.modelItem}
        onPress={() => handleModelSelect(item)}
        >
        <View style={styles.modelInfo}>
            <Text style={styles.modelName}>{item.name}</Text>
            <Text style={styles.modelYears}>{item.years}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            >
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
            <Text style={styles.title}>{brand}</Text>
            <Text style={styles.subtitle}>Выберите модель</Text>
            </View>
        </View>

        {loading ? (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Загрузка моделей...</Text>
            </View>
        ) : (
            <FlatList
            data={models}
            renderItem={renderModelItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                <Ionicons name="car-outline" size={64} color="#ccc" />
                <Text style={styles.emptyText}>Модели не найдены</Text>
                </View>
            }
            />
        )}
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    listContent: {
        padding: 16,
    },
    modelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    modelInfo: {
        flex: 1,
    },
    modelName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    modelYears: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    });