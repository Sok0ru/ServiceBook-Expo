    // src/screens/Garage/CarDetailsForm.tsx
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
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type CarDetailsFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetailsForm'>;
    type CarDetailsFormScreenRouteProp = RouteProp<RootStackParamList, 'CarDetailsForm'>;

    type Props = {
    navigation: CarDetailsFormScreenNavigationProp;
    route: CarDetailsFormScreenRouteProp;
    };

    export default function CarDetailsForm({ navigation, route }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();
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
        if (!formData.year || !formData.mileage) {
        Alert.alert('Ошибка', 'Пожалуйста, заполните обязательные поля');
        return;
        }

        Alert.alert('Успех', 'Автомобиль добавлен в гараж', [
        { text: 'OK', onPress: () => navigation.navigate('Garage') },
        ]);
    };

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
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>{generation}</Text>
            </View>
        </View>

        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Информация о выбранном автомобиле */}
            <View style={[styles.carInfoCard, adaptiveStyles.card]}>
            <Text style={[styles.carInfoTitle, adaptiveStyles.textMd]}>Выбранный автомобиль</Text>
            <View style={styles.carInfoRow}>
                <Text style={[styles.carInfoLabel, adaptiveStyles.textSm]}>Марка:</Text>
                <Text style={[styles.carInfoValue, adaptiveStyles.textSm]}>{brand}</Text>
            </View>
            <View style={styles.carInfoRow}>
                <Text style={[styles.carInfoLabel, adaptiveStyles.textSm]}>Модель:</Text>
                <Text style={[styles.carInfoValue, adaptiveStyles.textSm]}>{model}</Text>
            </View>
            <View style={styles.carInfoRow}>
                <Text style={[styles.carInfoLabel, adaptiveStyles.textSm]}>Поколение:</Text>
                <Text style={[styles.carInfoValue, adaptiveStyles.textSm]}>{generation}</Text>
            </View>
            </View>

            {/* Форма деталей */}
            <View style={[styles.formSection, adaptiveStyles.card]}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>ДЕТАЛИ АВТОМОБИЛЯ</Text>

            {/* 2 колонки на планшете */}
            <View
                style={[
                styles.formGrid,
                {
                    flexDirection: isTablet ? 'row' : 'column',
                    flexWrap: isTablet ? 'wrap' : 'nowrap',
                    gap: adaptiveValues.spacing.lg,
                },
                ]}
            >
                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                <Text style={[styles.inputLabel, adaptiveStyles.textSm]}>VIN номер</Text>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Введите VIN..."
                    placeholderTextColor="#999"
                    value={formData.vin}
                    onChangeText={(text) => setFormData({ ...formData, vin: text })}
                    maxLength={17}
                    autoCapitalize="characters"
                />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                <Text style={[styles.inputLabel, adaptiveStyles.textSm]}>Год выпуска *</Text>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Например: 2020"
                    placeholderTextColor="#999"
                    value={formData.year}
                    onChangeText={(text) => setFormData({ ...formData, year: text })}
                    keyboardType="numeric"
                    maxLength={4}
                />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                <Text style={[styles.inputLabel, adaptiveStyles.textSm]}>Пробег (км) *</Text>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Текущий пробег"
                    placeholderTextColor="#999"
                    value={formData.mileage}
                    onChangeText={(text) => setFormData({ ...formData, mileage: text })}
                    keyboardType="numeric"
                />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                <Text style={[styles.inputLabel, adaptiveStyles.textSm]}>Госномер</Text>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Например: A123BC777"
                    placeholderTextColor="#999"
                    value={formData.licensePlate}
                    onChangeText={(text) => setFormData({ ...formData, licensePlate: text })}
                    autoCapitalize="characters"
                />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                <Text style={[styles.inputLabel, adaptiveStyles.textSm]}>Цвет</Text>
                <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Цвет автомобиля"
                    placeholderTextColor="#999"
                    value={formData.color}
                    onChangeText={(text) => setFormData({ ...formData, color: text })}
                />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                <Text style={[styles.inputLabel, adaptiveStyles.textSm]}>Заметки</Text>
                <TextInput
                    style={[styles.input, styles.textArea, adaptiveStyles.textSm]}
                    placeholder="Дополнительная информация..."
                    placeholderTextColor="#999"
                    value={formData.notes}
                    onChangeText={(text) => setFormData({ ...formData, notes: text })}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                />
                </View>
            </View>
            </View>

            {/* Кнопка сохранения */}
            <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#007AFF' }]}
            onPress={handleSave}
            >
            <Text style={[styles.saveButtonText, adaptiveStyles.textMd]}>Добавить в гараж</Text>
            </TouchableOpacity>

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
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingVertical: 16,
    },
    carInfoCard: {
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
    carInfoTitle: {
        fontWeight: '600',
        marginBottom: 12,
        color: '#1a1a1a',
    },
    carInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    carInfoLabel: {
        color: '#666',
    },
    carInfoValue: {
        fontWeight: '500',
        color: '#1a1a1a',
    },
    formSection: {
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
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 16,
        color: '#666',
        textTransform: 'uppercase',
    },
    formGrid: {
        marginTop: 8,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputGroupTablet: {
        width: '48%',
    },
    inputLabel: {
        fontWeight: '500',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#f8f8f8',
    },
    textArea: {
        minHeight: 80,
    },
    saveButton: {
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
        fontWeight: '600',
        color: 'white',
    },
    });