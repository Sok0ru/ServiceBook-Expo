    import React, { useState } from 'react';
    import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type NavigationProp = StackNavigationProp<RootStackParamList, 'CarModels'>;

    const mockBrands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Subaru',
    ];

    export default function AddCar() {
    const navigation = useNavigation<NavigationProp>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();

    const handleBrandSelect = (brand: string) => {
        navigation.navigate('CarModels', { brand });
    };

    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity
        style={[styles.brandItem, adaptiveStyles.card, isTablet && styles.brandItemTablet]}
        onPress={() => handleBrandSelect(item)}
        >
        <Text style={[styles.brandName, adaptiveStyles.textMd]}>{item}</Text>
        <Text style={[styles.arrow, adaptiveStyles.textLg]}>›</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, adaptiveStyles.container]}>
        <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Добавить автомобиль</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Выберите марку</Text>
        </View>

        <FlatList
            data={mockBrands}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.list}
            numColumns={isTablet ? 2 : 1}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { paddingVertical: 16, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    title: { fontWeight: 'bold', color: '#1a1a1a' },
    subtitle: { color: '#666' },
    list: { padding: 16 },
    brandItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    brandItemTablet: { width: '48%', marginHorizontal: '1%' },
    brandName: { flex: 1, fontWeight: '500', color: '#1a1a1a' },
    arrow: { color: '#ccc' },
    });