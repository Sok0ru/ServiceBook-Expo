    import React, { useState } from 'react';
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useNavigation } from '@react-navigation/native';
    import { authAPI } from '../../api/auth';
    import { StackNavigationProp } from '@react-navigation/stack';

    export default function Registration() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    type RootStackParamList = {
        EmailVerification: { email: string; password: string };
    };
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'EmailVerification'>>();
    
    const handleRegister = async () => {
        const { email, password, confirmPassword } = formData;
        if (!email || !password || !confirmPassword) {
        Alert.alert('Ошибка', 'Заполните все поля');
        return;
        }
        if (password !== confirmPassword) {
        Alert.alert('Ошибка', 'Пароли не совпадают');
        return;
        }
        if (password.length < 6) {
        Alert.alert('Ошибка', 'Пароль минимум 6 символов');
        return;
        }
        setLoading(true);
        try {
        await authAPI.requestCode(email);
        navigation.navigate('EmailVerification', { email, password });
        } catch (e: any) {
        Alert.alert('Ошибка', e.response?.data?.message || 'Не удалось отправить код');
        Alert.alert(String(e))
        } finally {
        setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.topSection}>
                <Text style={styles.title}>ServiceBook</Text>
                <Text style={styles.sectionTitle}>Регистрация</Text>

                {/* Поля */}
                <View style={styles.fieldsGrid}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Подтвердите пароль"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                />
                </View>

                {/* Чек-боксы-заглушки */}
                <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}><View style={styles.checkbox} /><Text style={styles.checkboxText}>Прочитал ненужные документы</Text></View>
                <View style={styles.checkboxItem}><View style={styles.checkbox} /><Text style={styles.checkboxText}>Согласен на рассылку</Text></View>
                <View style={styles.checkboxItem}><View style={styles.checkbox} /><Text style={styles.checkboxText}>Согласен на оформление микрозайма :)</Text></View>
                </View>

                <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleRegister} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>РЕГИСТРАЦИЯ</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.secondaryButtonText}>ВОЙТИ</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    content: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingVertical: 24 },
    topSection: { paddingHorizontal: 24 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#1a1a1a' },
    sectionTitle: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 24, color: '#1a1a1a' },
    fieldsGrid: { gap: 16 },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
    },
    checkboxContainer: { marginTop: 20, marginBottom: 32 },
    checkboxItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#007AFF', borderRadius: 4, marginRight: 12 },
    checkboxText: { color: '#333', fontSize: 14 },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: { backgroundColor: '#cccccc' },
    buttonText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
    secondaryButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#007AFF' },
    secondaryButtonText: { fontWeight: '600', color: '#007AFF', fontSize: 16 },
    });