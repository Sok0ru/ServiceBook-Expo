    // CarDetailsForm.tsx
    import React, { useState } from 'react';
    import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { carsAPI } from '../../api/cars';
    import { RootStackParamList, AddCarStackParamList } from '../../types/navigation';
    import { CommonActions } from '@react-navigation/native';

    type RouteProp = import('@react-navigation/native').RouteProp<AddCarStackParamList, 'CarDetailsForm'>;
    type NavigationProp = StackNavigationProp<AddCarStackParamList, 'CarDetailsForm'>;

    export default function CarDetailsFormScreen() {
        const { adaptiveStyles, isTablet } = useAdaptiveStyles();
        const navigation = useNavigation<NavigationProp>();
        const { brand, model, generation } = useRoute<RouteProp>().params;

        const [form, setForm] = useState({
            vin: '',
            year: '',
            mileage: '',
            plate: '',
            color: '',
            notes: '',
        });

        const [loading, setLoading] = useState(false);

        const handleSave = async () => {
            // Валидация обязательных полей
            if (!form.year || !form.mileage) {
                Alert.alert('Ошибка', 'Пожалуйста, заполните обязательные поля (год выпуска и пробег)');
                return;
            }

            const payload = {
                brand,
                model,
                year: Number(form.year),
                mileage: Number(form.mileage),
                vin: form.vin || undefined,
                plate: form.plate || undefined,
                color: form.color || undefined,
            };

            console.log('📤 Отправляю POST /cars с payload:', JSON.stringify(payload, null, 2));

        setLoading(true);
        try {
            await carsAPI.add(payload);
            console.log('✅ Автомобиль успешно добавлен через POST /cars/create');
            
            // Навигация обратно в гараж
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ 
                        name: 'MainTabBar',
                        params: { 
                            screen: 'Garage'
                        }
                    }],
                })
            );
            
        } catch (e: any) {
            console.error('❌ Ошибка при добавлении автомобиля:', e);
            
            let errorMessage = 'Не удалось добавить автомобиль';
            if (e.response?.data?.message) {
                errorMessage = e.response.data.message;
            } else if (e.response?.status === 400) {
                errorMessage = 'Некорректные данные автомобиля';
            } else if (e.response?.status === 401) {
                errorMessage = 'Необходима авторизация';
            }
            
            Alert.alert('Ошибка', errorMessage);
        } finally {
            setLoading(false);
        }
    };

        return (
            <View style={[styles.container, adaptiveStyles.container]}>
                <View style={[styles.header, adaptiveStyles.container]}>
                    <Text style={[styles.title, adaptiveStyles.textMd]} numberOfLines={1}>{brand} {model}</Text>
                    <Text style={[styles.subtitle, adaptiveStyles.textSm]}>{generation}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    <View style={[styles.form, adaptiveStyles.card]}>
                        <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>ДЕТАЛИ АВТОМОБИЛЯ</Text>

                        <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: isTablet ? 16 : 0 }}>
                            <TextInput 
                                style={[styles.input, adaptiveStyles.textSm]} 
                                placeholder="VIN" 
                                value={form.vin} 
                                onChangeText={(t) => setForm({ ...form, vin: t })} 
                            />
                            <TextInput 
                                style={[styles.input, adaptiveStyles.textSm]} 
                                placeholder="Год выпуска *" 
                                keyboardType="numeric" 
                                value={form.year} 
                                onChangeText={(t) => setForm({ ...form, year: t })} 
                            />
                            <TextInput 
                                style={[styles.input, adaptiveStyles.textSm]} 
                                placeholder="Пробег (км) *" 
                                keyboardType="numeric" 
                                value={form.mileage} 
                                onChangeText={(t) => setForm({ ...form, mileage: t })} 
                            />
                            <TextInput 
                                style={[styles.input, adaptiveStyles.textSm]} 
                                placeholder="Госномер" 
                                value={form.plate} 
                                onChangeText={(t) => setForm({ ...form, plate: t })} 
                            />
                            <TextInput 
                                style={[styles.input, adaptiveStyles.textSm]} 
                                placeholder="Цвет" 
                                value={form.color} 
                                onChangeText={(t) => setForm({ ...form, color: t })} 
                            />
                        </View>

                        <TouchableOpacity 
                            style={[
                                styles.saveButton, 
                                { backgroundColor: loading ? '#ccc' : '#007AFF' }
                            ]} 
                            onPress={handleSave}
                            disabled={loading}
                        >
                            <Text style={[styles.saveButtonText, adaptiveStyles.textMd]}>
                                {loading ? 'Добавление...' : 'Добавить в гараж'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // Стили остаются без изменений
    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: '#f5f5f5' },
        header: { paddingVertical: 16, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
        title: { fontWeight: 'bold', color: '#1a1a1a' },
        subtitle: { color: '#666' },
        scroll: { padding: 16, paddingBottom: 100 },
        form: { padding: 16, marginBottom: 16 },
        sectionTitle: { fontWeight: '600', marginBottom: 16, color: '#666', textTransform: 'uppercase' },
        input: {
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 12,
            padding: 12,
            backgroundColor: '#f8f8f8',
            fontSize: 14,
            marginBottom: 12,
        },
        textArea: { minHeight: 80, textAlignVertical: 'top' },
        saveButton: {
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#007AFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
            marginTop: 16,
        },
        saveButtonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
    });