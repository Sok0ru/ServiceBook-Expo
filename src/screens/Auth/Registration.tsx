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
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useNavigation } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import AuthIcon from '../../components/AuthIconPng';

    type AuthStackParamList = {
    Registration: undefined;
    Login: undefined;
    EmailVerification: undefined;
    };

    type RegistrationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Registration'>;

    export default function Registration() {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegister = () => {
        navigation.navigate('EmailVerification');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
        >
            <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            >
            <View style={[styles.topSection, { paddingHorizontal: isTablet ? 48 : 24 }]}>
                <Text style={[styles.title, adaptiveStyles.textXl]}>ServiceBook</Text>
                <Text style={[styles.sectionTitle, adaptiveStyles.textLg]}>Регистрация</Text>

                {/* Поля регистрации - 2 колонки на планшете */}
                <View
                style={[
                    styles.fieldsGrid,
                    { flexDirection: isTablet ? 'row' : 'column' },
                ]}
                >
                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                    <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                    <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Пароль"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    />
                </View>

                <View style={[styles.inputGroup, isTablet && styles.inputGroupTablet]}>
                    <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="Подтвердите пароль"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                    />
                </View>
                </View>

                {/* Чек-боксы */}
                <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}>
                    <View style={styles.checkbox} />
                    <Text style={[styles.checkboxText, adaptiveStyles.textSm]}>Прочитал ненужные документы</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <View style={styles.checkbox} />
                    <Text style={[styles.checkboxText, adaptiveStyles.textSm]}>Согласен на рассылку</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <View style={styles.checkbox} />
                    <Text style={[styles.checkboxText, adaptiveStyles.textSm]}>Согласен на оформление микрозайма :)</Text>
                </View>
                </View>

                <TouchableOpacity
                style={[styles.button, { backgroundColor: '#007AFF' }]}
                onPress={handleRegister}
                >
                <Text style={[styles.buttonText, adaptiveStyles.textMd]}>РЕГИСТРАЦИЯ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: '#007AFF' }]}
                onPress={() => navigation.navigate('Login')}
                >
                <Text style={[styles.secondaryButtonText, adaptiveStyles.textMd]}>ВОЙТИ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton}>
                <Text style={[styles.linkButtonText, adaptiveStyles.textSm]}>СБРОСИТЬ ПАРОЛЬ</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingVertical: 24,
    },
    topSection: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 32,
        color: '#1a1a1a',
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 24,
        color: '#1a1a1a',
        textAlign: 'center',
    },
    fieldsGrid: {
        gap: 16,
    },
    inputGroup: {
        flex: 1,
    },
    inputGroupTablet: {
        width: '48%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    checkboxContainer: {
        marginBottom: 32,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 4,
        marginRight: 12,
    },
    checkboxText: {
        color: '#333',
    },
    button: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    secondaryButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
    },
    secondaryButtonText: {
        fontWeight: '600',
    },
    linkButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    linkButtonText: {
        color: '#007AFF',
        fontWeight: '500',
    },
    });