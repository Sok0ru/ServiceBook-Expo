    import React, { useState } from 'react';
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RouteProp } from '@react-navigation/native';
    import { Ionicons } from '@expo/vector-icons';
    import { RootStackParamList } from '../../types/navigation';

    type CarDetailsFormScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'CarDetailsForm'
    >;

    type CarDetailsFormScreenRouteProp = RouteProp<RootStackParamList, 'CarDetailsForm'>;

    type Props = {
    navigation: CarDetailsFormScreenNavigationProp;
    route: CarDetailsFormScreenRouteProp;
    };
    export default function CarDetailsForm({ navigation, route }: Props) {
    const { brand, model, generation } = route.params;
    const [formData, setFormData] = useState({
        vin: '',
        year: '',
        mileage: '',
        licensePlate: '',
        color: '',
        notes: '',
    });

    const handleSave = () => {
        // Валидация
        if (!formData.year || !formData.mileage) {
        Alert.alert('Ошибка', 'Пожалуйста, заполните обязательные поля');
        return;
        }

        // TODO: Сохранение в бэкенд
        console.log('Сохранение автомобиля:', {
        brand,
        model,
        generation,
        ...formData
        });

        Alert.alert(
        'Успех',
        'Автомобиль добавлен в гараж',
        [
            {
            text: 'OK',
            onPress: () => navigation.navigate('Garage')
            }
        ]
        );
    };

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
            <Text style={styles.subtitle}>{generation}</Text>
            </View>
        </View>

        <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Информация о выбранном автомобиле */}
            <View style={styles.carInfoCard}>
            <Text style={styles.carInfoTitle}>Выбранный автомобиль</Text>
            <View style={styles.carInfoRow}>
                <Text style={styles.carInfoLabel}>Марка:</Text>
                <Text style={styles.carInfoValue}>{brand}</Text>
            </View>
            <View style={styles.carInfoRow}>
                <Text style={styles.carInfoLabel}>Модель:</Text>
                <Text style={styles.carInfoValue}>{model}</Text>
            </View>
            <View style={styles.carInfoRow}>
                <Text style={styles.carInfoLabel}>Поколение:</Text>
                <Text style={styles.carInfoValue}>{generation}</Text>
            </View>
            </View>

            {/* Форма деталей */}
            <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>ДЕТАЛИ АВТОМОБИЛЯ</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>VIN номер</Text>
                <TextInput
                style={styles.input}
                placeholder="Введите VIN..."
                placeholderTextColor="#999"
                value={formData.vin}
                onChangeText={(text) => setFormData({...formData, vin: text})}
                maxLength={17}
                autoCapitalize="characters"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Год выпуска *</Text>
                <TextInput
                style={styles.input}
                placeholder="Например: 2020"
                placeholderTextColor="#999"
                value={formData.year}
                onChangeText={(text) => setFormData({...formData, year: text})}
                keyboardType="numeric"
                maxLength={4}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Пробег (км) *</Text>
                <TextInput
                style={styles.input}
                placeholder="Текущий пробег"
                placeholderTextColor="#999"
                value={formData.mileage}
                onChangeText={(text) => setFormData({...formData, mileage: text})}
                keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Госномер</Text>
                <TextInput
                style={styles.input}
                placeholder="Например: A123BC777"
                placeholderTextColor="#999"
                value={formData.licensePlate}
                onChangeText={(text) => setFormData({...formData, licensePlate: text})}
                autoCapitalize="characters"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Цвет</Text>
                <TextInput
                style={styles.input}
                placeholder="Цвет автомобиля"
                placeholderTextColor="#999"
                value={formData.color}
                onChangeText={(text) => setFormData({...formData, color: text})}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Заметки</Text>
                <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Дополнительная информация..."
                placeholderTextColor="#999"
                value={formData.notes}
                onChangeText={(text) => setFormData({...formData, notes: text})}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                />
            </View>
            </View>

            {/* Кнопка сохранения */}
            <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            >
            <Text style={styles.saveButtonText}>Добавить в гараж</Text>
            </TouchableOpacity>
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
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    carInfoCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    carInfoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    carInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    carInfoLabel: {
        fontSize: 14,
        color: '#666',
    },
    carInfoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    formSection: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
    },
    textArea: {
        minHeight: 80,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    });