    import React, { useState } from 'react';
    import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, StyleSheet, GestureResponderEvent, Keyboard } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { authAPI } from '../../api/auth';
    import { setAccessToken } from '../../utils/token';
import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';

    export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) return Alert.alert('Заполните поля');
        setLoading(true);
        try {
        const { jwt } = await authAPI.logIn(email, password);
        await setAccessToken(jwt.accessToken);
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
        } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.message || 'Неверные данные');
        } finally {
        setLoading(false);
        }
    };

    const handleRegistration = () => {
        Keyboard.dismiss();
        navigation.navigate('Registration');
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>ServiceBook</Text>
        <Text style={styles.subtitle}>Вход по паролю</Text>

        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
        >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Войти</Text>}
        </TouchableOpacity>
                <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: '#007AFF' }]}
                onPress={handleRegistration}
                >
            <Text style={[styles.secondaryButtonText, adaptiveStyles.textMd]}>РЕГИСТРАЦИЯ</Text>
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
        secondaryButton: {
        marginTop:20,    
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
    },
    secondaryButtonText: {
        fontWeight: '600',
    },
    });