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
    import AuthIcon from '../../components/AuthIconPng';

    type AuthStackParamList = {
    Registration: undefined;
    Login: undefined;
    EmailVerification: undefined;
    };

    type RegistrationScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'Registration'
    >;

    type Props = {
    navigation: RegistrationScreenNavigationProp;
    };

    export default function Registration({ navigation }: Props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegister = () => {
        // TODO: Регистрация
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
            <View style={styles.topSection}>
                <Text style={styles.title}>ServiceBook</Text>
                
                <Text style={styles.sectionTitle}>Регистрация</Text>
                
                {/* Поля регистрации */}
                <View style={styles.fieldsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => setFormData({...formData, password: text})}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Подтвердите пароль"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                />
                </View>

                {/* Checkboxes из дизайна */}
                <View style={styles.checkboxContainer}>
                <View style={styles.checkboxItem}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>Прочитал ненужные документы</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>Согласен на рассылку</Text>
                </View>
                <View style={styles.checkboxItem}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checkboxText}>Согласен на оформление микрозайма :)</Text>
                </View>
                </View>

                <TouchableOpacity 
                style={styles.button}
                onPress={handleRegister}
                >
                <Text style={styles.buttonText}>РЕГИСТРАЦИЯ</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}
                >
                <Text style={styles.secondaryButtonText}>ВОЙТИ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkButtonText}>СБРОСИТЬ ПАРОЛЬ</Text>
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
        padding: 24,
    },
    topSection: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 32,
        color: '#1a1a1a',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 24,
        color: '#1a1a1a',
        textAlign: 'center',
    },
    fieldsContainer: {
        marginBottom: 24,
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
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
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
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
        marginBottom: 12,
    },
    secondaryButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
    linkButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    linkButtonText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    });