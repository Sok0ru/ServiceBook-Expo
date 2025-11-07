    import React, { useState, useEffect } from 'react';
    import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';

    // Упрощенная версия без сложных типов
    export default function AddCar({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [brands, setBrands] = useState([
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
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const filtered = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBrands(filtered);
    }, [searchQuery, brands]);

    const handleBrandSelect = (brand: any) => {
        console.log('Selected brand:', brand.name);
        // navigation.navigate('CarModels', { brand: brand.name });
        alert(`Выбрана марка: ${brand.name}`);
    };

    const renderBrandItem = ({ item }: any) => (
        <TouchableOpacity
        style={styles.brandItem}
        onPress={() => handleBrandSelect(item)}
        >
        <View style={styles.brandLogo}>
            <Text style={styles.brandIcon}>🚗</Text>
        </View>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <Text style={styles.title}>Добавить автомобиль</Text>
            <Text style={styles.subtitle}>Выберите марку автомобиля</Text>
        </View>

        {/* Поиск */}
        <View style={styles.searchContainer}>
            <TextInput
            style={styles.searchInput}
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
        />

        {/* Кнопка назад */}
        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backButtonText}>Назад в гараж</Text>
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
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    searchContainer: {
        backgroundColor: 'white',
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    searchInput: {
        fontSize: 16,
        color: '#1a1a1a',
    },
    listContent: {
        padding: 16,
    },
    brandItem: {
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
        fontSize: 20,
    },
    brandName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    arrow: {
        fontSize: 16,
        color: '#ccc',
    },
    backButton: {
        backgroundColor: '#666',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    });