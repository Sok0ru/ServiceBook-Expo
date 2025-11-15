    import React, { useState } from 'react';
    import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useNavigation } from '@react-navigation/native';
    import { authAPI } from '../../api/auth';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';
    import { setToken } from '../../utils/tokenSync';

    type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

    export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
        Alert.alert('Ошибка', 'Заполните поля');
        return;
        }
        setLoading(true);
        try {
        const { jwt } = await authAPI.logIn(email, password);
        await setToken(jwt.accessToken);
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
        } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.message || 'Неверные данные');
        } finally {
        setLoading(false);
        }
    };

    const handleRegistration = () => {
        navigation.navigate('Registration');
    };

    return (
        <View style={[styles.container, adaptiveStyles.container]}>
        <Text style={[styles.title, adaptiveStyles.textXl]}>ServiceBook</Text>
        <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Вход по паролю</Text>

        <TextInput
            style={[styles.input, adaptiveStyles.textSm]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={[styles.input, adaptiveStyles.textSm]}
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
        marginTop: 20,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    secondaryButtonText: { fontWeight: '600', color: '#007AFF', fontSize: 16 },
    });