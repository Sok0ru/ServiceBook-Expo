    import React, { useState } from 'react';
    import {
        View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        Alert,
        useWindowDimensions,
        KeyboardAvoidingView,
        Platform,
        Keyboard,
        TouchableWithoutFeedback,
    } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { RootStackParamList } from '../../types/navigation';

    type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmailLogin'>;

    export default function LoginScreen() {
        const [email, setEmail] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const navigation = useNavigation<LoginScreenNavigationProp>();
        const { width } = useWindowDimensions();

        const isSmallScreen = width < 375;

        const validateEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const handleContinue = async () => {
            if (!email.trim()) {
                Alert.alert('Ошибка', 'Пожалуйста, введите email');
                return;
            }

            if (!validateEmail(email)) {
                Alert.alert('Ошибка', 'Пожалуйста, введите корректный email');
                return;
            }

            setIsLoading(true);

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigation.navigate('EmailVerification', { email });
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось отправить код подтверждения');
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={[styles.content, { paddingHorizontal: isSmallScreen ? 20 : 24 }]}>
                        <View style={styles.centerContent}>
                            <Text style={[styles.title, { fontSize: isSmallScreen ? 22 : 24 }]}>
                                Вход в сервисную книжку
                            </Text>

                            <Text style={[styles.subtitle, { fontSize: isSmallScreen ? 14 : 16 }]}>
                                Введите ваш email для получения кода подтверждения
                            </Text>

                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, { fontSize: isSmallScreen ? 14 : 16 }]}>Email</Text>
                                <TextInput
                                    style={[styles.input, isSmallScreen && styles.smallInput]}
                                    placeholder="example@mail.ru"
                                    placeholderTextColor="#999"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    editable={!isLoading}
                                    returnKeyType="done"
                                    onSubmitEditing={handleContinue}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.button, (!email.trim() || isLoading) && styles.buttonDisabled]}
                                onPress={handleContinue}
                                disabled={!email.trim() || isLoading}
                            >
                                <Text style={[styles.buttonText, { fontSize: isSmallScreen ? 14 : 16 }]}>
                                    {isLoading ? 'Отправка...' : 'Продолжить'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.registrationLink}
                                onPress={() => navigation.navigate('Registration')}
                            >
                                <Text style={[styles.registrationText, { fontSize: isSmallScreen ? 12 : 14 }]}>
                                    Нет аккаунта? Зарегистрироваться
                                </Text>
                            </TouchableOpacity>

                            <Text style={[styles.footerText, { fontSize: isSmallScreen ? 10 : 12 }]}>
                                Нажимая «Продолжить», вы соглашаетесь с условиями использования
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        content: {
            flex: 1,
            justifyContent: 'center',
        },
        centerContent: {
            flexGrow: 1,
            justifyContent: 'center',
            paddingBottom: 40,
        },
        title: {
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 12,
            color: '#333',
        },
        subtitle: {
            textAlign: 'center',
            marginBottom: 40,
            color: '#666',
            lineHeight: 22,
        },
        inputContainer: {
            marginBottom: 30,
        },
        label: {
            fontWeight: '500',
            marginBottom: 8,
            color: '#333',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 16,
            backgroundColor: '#f9f9f9',
        },
        smallInput: {
            paddingVertical: 12,
            fontSize: 14,
        },
        button: {
            backgroundColor: '#007AFF',
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 16,
        },
        buttonDisabled: {
            backgroundColor: '#ccc',
        },
        buttonText: {
            color: '#fff',
            fontWeight: '600',
        },
        registrationLink: {
            alignItems: 'center',
            marginBottom: 30,
        },
        registrationText: {
            color: '#007AFF',
            fontWeight: '500',
        },
        footerText: {
            textAlign: 'center',
            color: '#999',
            lineHeight: 16,
        },
    });