    import React, { useState } from 'react';
    import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useNavigation } from '@react-navigation/native';
    import { authAPI } from '../../api/auth';
    import { RootStackParamList } from '../../types/navigation';

    type NavigationProp = StackNavigationProp<RootStackParamList, 'EmailVerification'>;

    export default function EmailLoginScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const handleRequestCode = async () => {
        if (!email.trim()) return Alert.alert('Ошибка', 'Введите email');
        if (!validateEmail(email)) return Alert.alert('Ошибка', 'Некорректный email');
        setLoading(true);
        try {
        await authAPI.requestCode(email);
        navigation.navigate('EmailVerification', { email });
        } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось отправить код');
        } finally {
        setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>ServiceBook</Text>
        <Text style={styles.subtitle}>Введите email для получения кода подтверждения</Text>

        <TextInput
            style={styles.input}
            placeholder="example@mail.ru"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />

        <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRequestCode}
            disabled={loading}
        >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Отправить код</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#ffffff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginBottom: 24 },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonDisabled: { backgroundColor: '#cccccc' },
    buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
    link: { marginTop: 16, alignItems: 'center' },
    linkText: { color: '#007AFF', fontWeight: '500', fontSize: 14 },
    });