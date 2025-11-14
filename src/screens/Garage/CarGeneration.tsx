    // src/screens/Garage/CarGeneration.tsx
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
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';
    import { AddCarStackParamList } from '../../types/navigation';

    type CarGenerationScreenNavigationProp = StackNavigationProp<AddCarStackParamList, 'CarGeneration'>;
    type CarGenerationScreenRouteProp = RouteProp<AddCarStackParamList, 'CarGeneration'>;

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
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();
    const { brand, model } = route.params as unknown as { brand: string; model: string };

    const [generations, setGenerations] = useState<CarGeneration[]>([]);
    const [loading, setLoading] = useState(true);

    const mockGenerations: CarGeneration[] = [
        { id: '1', name: 'VI (SL)', years: '2024-н.в.', bodyType: 'SUV' },
        { id: '2', name: 'V (SK)', years: '2018-2024', bodyType: 'SUV' },
        { id: '3', name: 'IV (SJ)', years: '2012-2018', bodyType: 'SUV' },
        { id: '4', name: 'III (SH)', years: '2008-2012', bodyType: 'SUV' },
        { id: '5', name: 'II (SG)', years: '2002-2008', bodyType: 'SUV' },
        { id: '6', name: 'I (SF)', years: '1997-2002', bodyType: 'SUV' },
    ];

    useEffect(() => {
        setTimeout(() => {
        setGenerations(mockGenerations);
        setLoading(false);
        }, 1000);
    }, []);

    const handleGenerationSelect = (generation: CarGeneration) => {
    navigation.navigate('CarDetailsForm', {
        brand,
        model,
        generation: generation.name,
        });
    };

    const renderGenerationItem = ({ item }: { item: CarGeneration }) => (
        <TouchableOpacity
        style={[
            styles.generationItem,
            adaptiveStyles.card,
            isTablet && styles.generationItemTablet,
        ]}
        onPress={() => handleGenerationSelect(item)}
        >
        <View style={styles.generationInfo}>
            <Text style={[styles.generationName, adaptiveStyles.textMd]} numberOfLines={1}>
            {item.name}
            </Text>
            <Text style={[styles.generationDetails, adaptiveStyles.textSm]}>
            {item.years} • {item.bodyType}
            </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={[styles.header, adaptiveStyles.container]}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
            <Text style={[styles.title, adaptiveStyles.textMd]} numberOfLines={1}>
                {brand} {model}
            </Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Выберите поколение</Text>
            </View>
        </View>

        {loading ? (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, adaptiveStyles.textSm]}>Загрузка поколений...</Text>
            </View>
        ) : (
            <FlatList
            data={generations}
            renderItem={renderGenerationItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            numColumns={isTablet ? 2 : 1} // ← 2 колонки на планшете
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
        paddingVertical: 16,
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
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 16,
        color: '#666',
    },
    listContent: {
        padding: 16,
    },
    generationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    generationItemTablet: {
        width: '48%',
        marginHorizontal: '1%',
    },
    generationInfo: {
        flex: 1,
    },
    generationName: {
        fontWeight: '500',
        marginBottom: 4,
        color: '#1a1a1a',
    },
    generationDetails: {
        color: '#666',
    },
    });