    import React, { useState } from 'react';
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
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

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
        >

            <View style={styles.topSection}>
                <Text style={styles.title}>ServiceBook</Text>
                
                <TextInput
                style={styles.input}
                placeholder="ПАРОЛЬ"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                />
                
                <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>ЗАБЫЛИ ПАРОЛЬ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={[styles.button, !password && styles.buttonDisabled]}
                onPress={() => navigation.navigate('MainTabs')}
                disabled={!password}
                >
                <Text style={styles.buttonText}>ПРОДОЛЖИТЬ</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Registration')}
                >
                <Text style={styles.secondaryButtonText}>РЕГИСТРАЦИЯ</Text>
                </TouchableOpacity>
            </View>

                <View style={styles.iconContainer}>
                <AuthIcon size={150} />
                </View>

        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        padding: 24,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        paddingTop:100,
        flex: 1,
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 48,
        color: '#1a1a1a',
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
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
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
        marginTop: 0,
        marginBottom: 20,
    },
    });