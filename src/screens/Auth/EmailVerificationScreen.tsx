    import React, { useState } from 'react';
    import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
    import { RouteProp } from '@react-navigation/native';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { useCodeInput } from '../../hooks/useCodeInput';
    import { authAPI } from '../../api/auth';

    import { RootStackParamList } from '../../types/navigation';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { setToken } from '../../utils/tokenSync';


    type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;
    type RoutePropT = RouteProp<RootStackParamList, 'EmailVerification'>;

    export default function EmailVerificationScreen() {
    const { email } = useRoute<RoutePropT>().params;
    const [password, setPassword] = useState('');
    const { code, refs, onChange, onKeyPress, isComplete } = useCodeInput();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const handleSignUp = async () => {
    if (!isComplete) return Alert.alert('Введите 6 цифр');
    if (password.length < 6) return Alert.alert('Пароль минимум 6 символов');
    setLoading(true);
    try {
        const codeNum = Number(code.join(''));
        console.log('👉 signUp body:', { email, password, code: codeNum });
        const { jwt } = await authAPI.signUp(email, password, codeNum);
        await setToken(jwt.accessToken);
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.description || 'Неверный код');
    } finally {
        setLoading(false);
    }
    };


    return (
        <View style={styles.container}>
        <Text style={styles.title}>ServiceBook</Text>
        <Text style={styles.subtitle}>Код отправлен на {email}</Text>

        <View style={styles.codeRow}>
            {code.map((digit, idx) => (
            <TextInput
                key={idx}
                ref={(r) => void (refs.current[idx] = r!)}
                style={styles.codeInput}
                value={digit}
                onChangeText={(t) => onChange(t, idx)}
                onKeyPress={(e) => onKeyPress(e, idx)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
            />
            ))}
        </View>

        <TextInput
            style={styles.input}
            placeholder="Придумайте пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity
            style={[styles.button, (!isComplete || loading) && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={!isComplete || loading}
        >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Зарегистрироваться</Text>}
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#ffffff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginBottom: 24 },
    codeRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    codeInput: {
        width: 48,
        height: 56,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        backgroundColor: '#f8f8f8',
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonDisabled: { backgroundColor: '#cccccc' },
    buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
    });