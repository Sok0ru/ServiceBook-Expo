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

    type CarGenerationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CarGeneration'
    >;

    type CarGenerationScreenRouteProp = RouteProp<RootStackParamList, 'CarGeneration'>;

    type Props = {
    navigation: CarGenerationScreenNavigationProp;
    route: CarGenerationScreenRouteProp;
};

    type CarGeneration = {
    id: string;
    name: string;
    years: string;
    bodyType: string;
    };

    export default function CarGeneration({ navigation, route }: Props) {
    const { brand, model } = route.params;
    const [generations, setGenerations] = useState<CarGeneration[]>([]);
    const [loading, setLoading] = useState(true);

    // Мок данные поколений
    const mockGenerations: CarGeneration[] = [
        { id: '1', name: 'V (SGP)', years: '2018-2024', bodyType: 'SUV' },
        { id: '2', name: 'IV (SJ)', years: '2012-2018', bodyType: 'SUV' },
        { id: '3', name: 'III (SH)', years: '2008-2012', bodyType: 'SUV' },
        { id: '4', name: 'II (SG)', years: '2002-2008', bodyType: 'SUV' },
        { id: '5', name: 'I (SF)', years: '1997-2002', bodyType: 'SUV' },
    ];

    useEffect(() => {
        setTimeout(() => {
        setGenerations(mockGenerations);
        setLoading(false);
        }, 1000);
    }, []);

    const handleGenerationSelect = (generation: CarGeneration) => {
        navigation.navigate('CarDetailsForm', {
        brand: brand,
        model: model,
        generation: generation.name
        });
    };

    const renderGenerationItem = ({ item }: { item: CarGeneration }) => (
        <TouchableOpacity
        style={styles.generationItem}
        onPress={() => handleGenerationSelect(item)}
        >
        <View style={styles.generationInfo}>
            <Text style={styles.generationName}>{item.name}</Text>
            <Text style={styles.generationDetails}>
            {item.years} • {item.bodyType}
            </Text>
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
            <Text style={styles.title}>{brand} {model}</Text>
            <Text style={styles.subtitle}>Выберите поколение</Text>
            </View>
        </View>

        {loading ? (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Загрузка поколений...</Text>
            </View>
        ) : (
            <FlatList
            data={generations}
            renderItem={renderGenerationItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
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
        fontSize: 18,
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
    generationItem: {
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
    generationInfo: {
        flex: 1,
    },
    generationName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    generationDetails: {
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
    });