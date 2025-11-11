    import React, { useState, useEffect } from 'react';
    import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type AddCarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddCar'>;

    type Props = {
    navigation: AddCarScreenNavigationProp;
    };

    export default function AddCar({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

    const [searchQuery, setSearchQuery] = useState('');
    const [brands] = useState([
        { id: '1', name: 'Audi' },
        { id: '2', name: 'BMW' },
        { id: '3', name: 'Mercedes-Benz' },
        { id: '4', name: 'Volkswagen' },
        { id: '5', name: 'Toyota' },
        { id: '6', name: 'Honda' },
        { id: '7', name: 'Nissan' },
        { id: '8', name: 'Hyundai' },
        { id: '9', name: 'Kia' },
        { id: '10', name: 'Subaru' },
    ]);
    const [filteredBrands, setFilteredBrands] = useState(brands);

    useEffect(() => {
        const filtered = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBrands(filtered);
    }, [searchQuery, brands]);

    const handleBrandSelect = (brand: any) => {
        navigation.navigate('CarModels', { brand: brand.name });
    };

    const renderBrandItem = ({ item }: any) => (
        <TouchableOpacity
        style={[
            styles.brandItem,
            adaptiveStyles.card,
            isTablet && styles.brandItemTablet,
        ]}
        onPress={() => handleBrandSelect(item)}
        >
        <View style={styles.brandLogo}>
            <Text style={[styles.brandIcon, adaptiveStyles.textLg]}>🚗</Text>
        </View>
        <Text style={[styles.brandName, adaptiveStyles.textMd]} numberOfLines={1}>
            {item.name}
        </Text>
        <Text style={[styles.arrow, adaptiveStyles.textLg]}>›</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Добавить автомобиль</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Выберите марку автомобиля</Text>
        </View>

        {/* Поиск */}
        <View style={[styles.searchContainer, adaptiveStyles.card]}>
            <TextInput
            style={[styles.searchInput, adaptiveStyles.textSm]}
            placeholder="Поиск марки..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            />
        </View>

        {/* Список марок */}
        <FlatList
            data={filteredBrands}
            renderItem={renderBrandItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            numColumns={isTablet ? 2 : 1} // ← 2 колонки на планшете
        />

        {/* Кнопка назад */}
        <TouchableOpacity
            style={[styles.backButton, { backgroundColor: '#666' }]}
            onPress={() => navigation.goBack()}
        >
            <Text style={[styles.backButtonText, adaptiveStyles.textMd]}>Назад в гараж</Text>
        </TouchableOpacity>
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
    searchContainer: {
        margin: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    searchInput: {
        color: '#1a1a1a',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    brandItem: {
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
    brandItemTablet: {
        width: '48%',
        marginHorizontal: '1%',
    },
    brandLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    brandIcon: {
        color: '#666',
    },
    brandName: {
        flex: 1,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    arrow: {
        color: '#ccc',
    },
    backButton: {
        margin: 16,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButtonText: {
        fontWeight: '600',
        color: 'white',
    },
    });