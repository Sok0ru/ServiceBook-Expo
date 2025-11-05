    import React from 'react';
    import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context'; 
    import { StackNavigationProp } from '@react-navigation/stack';

    type AuthStackParamList = {
    EmailVerification: undefined;
    Login: undefined;
    Dashboard: undefined;
    };

    type EmailVerificationScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'EmailVerification'
    >;

    type Props = {
    navigation: EmailVerificationScreenNavigationProp;
    };

    export default function EmailVerification({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.content}>
            <Text style={styles.title}>ServiceBook</Text>
            <Text style={styles.subtitle}>
            код подтверждения был отправлен на вашу почту
            </Text>
            
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
            >
            <Text style={styles.buttonText}>ПРОДОЛЖИТЬ</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 48,
        color: '#1a1a1a',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
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
    buttonText: {
        color: '#1a1a1a',
        fontSize: 16,
        fontWeight: '600',
    },
    });