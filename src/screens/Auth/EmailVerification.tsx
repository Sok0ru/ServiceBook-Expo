    // src/screens/Auth/EmailVerificationScreen.tsx
    import React from 'react';
    import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useNavigation } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import AuthIcon from '../../components/AuthIconPng';

    type AuthStackParamList = {
    EmailVerification: undefined;
    Login: undefined;
    MainTabs: undefined;
    };

    type EmailVerificationScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    'EmailVerification'
    >;

    type Props = {
    navigation: EmailVerificationScreenNavigationProp;
    };

    export default function EmailVerification({ navigation }: Props) {
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={[styles.content, { paddingHorizontal: isTablet ? 48 : 24 }]}>
            <View style={styles.iconContainer}>
            <AuthIcon size={isTablet ? 200 : 150} />
            </View>

            <View style={styles.textBlock}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>ServiceBook</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>
                Код подтверждения был отправлен на вашу почту
            </Text>
            </View>

            <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007AFF' }]}
            onPress={() => navigation.navigate('Login')}
            >
            <Text style={[styles.buttonText, adaptiveStyles.textMd]}>ПРОДОЛЖИТЬ</Text>
            </TouchableOpacity>
        </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: isTablet ? 120 : 100,
        paddingBottom: isTablet ? 120 : 100,
    },
    iconContainer: {
        marginTop: isTablet ? 60 : 40,
        marginBottom: isTablet ? 60 : 40,
    },
    textBlock: {
        alignItems: 'center',
        marginBottom: isTablet ? 64 : 48,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1a1a1a',
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666666',
        lineHeight: 22,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
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
    });