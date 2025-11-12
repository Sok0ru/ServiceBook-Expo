    import React, { useState } from 'react';
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useNavigation } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import AuthIcon from '../../components/AuthIconPng';

    type AuthStackParamList = {
    Login: undefined;
    Registration: undefined;
    MainTabs: undefined;
    };

    type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

    export default function Login({ navigation }: Props) {
    const [password, setPassword] = useState('');
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();

    const handleContinue = () => {
        Keyboard.dismiss();
        navigation.navigate('MainTabs');
    };

    const handleRegistration = () => {
        Keyboard.dismiss();
        navigation.navigate('Registration');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <View style={[styles.content, { paddingHorizontal: isTablet ? 48 : 24 }]}>
                {/* Верхняя часть - иконка + заголовок */}
                <View style={styles.headerSection}>
                <AuthIcon size={isTablet ? 180 : 150} />
                <Text style={[styles.title, adaptiveStyles.textXl]}>ServiceBook</Text>
                </View>

                {/* Форма */}
                <View style={styles.formWrapper}>
                <View style={styles.formSection}>
                    <TextInput
                    style={[styles.input, adaptiveStyles.textSm]}
                    placeholder="ПАРОЛЬ"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={[styles.forgotPasswordText, adaptiveStyles.textSm]}>ЗАБЫЛИ ПАРОЛЬ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#007AFF' }]}
                    onPress={handleContinue}
                    >
                    <Text style={[styles.buttonText, adaptiveStyles.textMd]}>ПРОДОЛЖИТЬ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.secondaryButton, { borderColor: '#007AFF' }]}
                    onPress={handleRegistration}
                    >
                    <Text style={[styles.secondaryButtonText, adaptiveStyles.textMd]}>РЕГИСТРАЦИЯ</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    formWrapper: {
        flex: 0.4,
        justifyContent: 'flex-start',
    },
    formSection: {
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a1a1a',
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#f8f8f8',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 32,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontWeight: '500',
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
    });