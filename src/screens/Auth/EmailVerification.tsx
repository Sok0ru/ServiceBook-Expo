    import React from 'react';
    import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { useNavigation } from '@react-navigation/native';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { useCodeInput } from '../../hooks/useCodeInput';
    import AuthIcon from '../../components/AuthIconPng';

    type Props = { navigation: StackNavigationProp<any, 'EmailVerification'> };

    export default function EmailVerification({ navigation }: Props) {
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const { code, refs, onChange, onKeyPress, isComplete } = useCodeInput();

    const handleContinue = () => {
        if (!isComplete) return;
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={[styles.content, { paddingHorizontal: isTablet ? 48 : 24 }]}>
            <View
            style={[
                styles.iconContainer,
                {
                marginTop: isTablet ? 60 : 40,
                marginBottom: isTablet ? 60 : 40,
                },
            ]}
            >
            <AuthIcon size={isTablet ? 200 : 150} />
            </View>

            <View
            style={[styles.textBlock, { marginBottom: isTablet ? 64 : 48 }]}
            >
            <Text style={[styles.title, adaptiveStyles.textXl]}>ServiceBook</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>
                Код подтверждения был отправлен на вашу почту
            </Text>
            </View>

            {/* 6-значный код */}
            <View style={styles.codeRow}>
            {code.map((digit, idx) => (
                <TextInput
                key={idx}
                ref={(r) => {
                refs.current[idx] = r!;
                }}
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

            <TouchableOpacity
            style={[styles.button, { backgroundColor: isComplete ? '#007AFF' : '#ccc' }]}
            onPress={handleContinue}
            disabled={!isComplete}
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
        paddingTop: 100,
        paddingBottom: 100,
    },
    iconContainer: {},
    textBlock: {
        alignItems: 'center',
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
    codeRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 40,
    },
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
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    });