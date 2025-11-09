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
    useWindowDimensions,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import AuthIcon from '../../components/AuthIconPng';

    type AuthStackParamList = {
    EmailVerification: undefined;
    Login: undefined;
    Registration: undefined;
    MainTabs: undefined;
    };

    type LoginScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'Login'
    >;

    type Props = {
    navigation: LoginScreenNavigationProp;
    };

    export default function Login({ navigation }: Props) {
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions();

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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
            <View style={styles.content}>
                {/* Верхняя часть - всегда видна */}
                <View style={styles.headerSection}>
                <View style={styles.iconContainer}>
                    <AuthIcon size={height < 700 ? 120 : 150} />
                </View>
                <Text style={[
                    styles.title,
                    { fontSize: height < 700 ? 24 : 28 }
                ]}>ServiceBook</Text>
                </View>

                {/* Форма */}
                <View style={styles.formWrapper}>
                <View style={styles.formSection}>
                    <TextInput
                    style={styles.input}
                    placeholder="ПАРОЛЬ"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                    />
                    
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>ЗАБЫЛИ ПАРОЛЬ</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={[styles.button, !password && styles.buttonDisabled]}
                    onPress={handleContinue}
                    disabled={!password}
                    >
                    <Text style={styles.buttonText}>ПРОДОЛЖИТЬ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={handleRegistration}
                    >
                    <Text style={styles.secondaryButtonText}>РЕГИСТРАЦИЯ</Text>
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
        paddingHorizontal: 24,
        paddingTop: 6, 
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 20, 
        marginTop: 10, 
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
        marginTop: 0,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 32,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: {
        width: 0,
        height: 4,
        },

    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
        marginTop: 12,
    },
    secondaryButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
    iconContainer: {
        alignItems: 'center',
    },
    });