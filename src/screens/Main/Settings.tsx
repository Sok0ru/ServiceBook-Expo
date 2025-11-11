    // src/screens/Main/Settings.tsx
    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';

    export default function Settings() {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>Настройки</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>Настройки приложения</Text>
            </View>

            <View style={styles.content}>
            {/* Профиль */}
            <View style={[styles.section, adaptiveStyles.card]}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>ПРОФИЛЬ</Text>
                <TouchableOpacity style={styles.settingItem}>
                <Text style={[styles.settingText, adaptiveStyles.textMd]}>Личные данные</Text>
                <Text style={[styles.settingArrow, adaptiveStyles.textLg]}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                <Text style={[styles.settingText, adaptiveStyles.textMd]}>Уведомления</Text>
                <Text style={[styles.settingArrow, adaptiveStyles.textLg]}>›</Text>
                </TouchableOpacity>
            </View>

            {/* Приложение */}
            <View style={[styles.section, adaptiveStyles.card]}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>ПРИЛОЖЕНИЕ</Text>
                <View style={styles.settingItem}>
                <Text style={[styles.settingText, adaptiveStyles.textMd]}>Темная тема</Text>
                <Switch value={false} />
                </View>
                <TouchableOpacity style={styles.settingItem}>
                <Text style={[styles.settingText, adaptiveStyles.textMd]}>Язык</Text>
                <Text style={[styles.settingValue, adaptiveStyles.textSm]}>Русский</Text>
                </TouchableOpacity>
            </View>

            {/* О приложении */}
            <View style={[styles.section, adaptiveStyles.card]}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textXs]}>О ПРИЛОЖЕНИИ</Text>
                <TouchableOpacity style={styles.settingItem}>
                <Text style={[styles.settingText, adaptiveStyles.textMd]}>Версия</Text>
                <Text style={[styles.settingValue, adaptiveStyles.textSm]}>1.0.0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingItem}>
                <Text style={[styles.settingText, adaptiveStyles.textMd]}>Политика конфиденциальности</Text>
                <Text style={[styles.settingArrow, adaptiveStyles.textLg]}>›</Text>
                </TouchableOpacity>
            </View>

            {/* Выход */}
            <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}>
                <Text style={[styles.logoutButtonText, adaptiveStyles.textMd]}>Выйти из аккаунта</Text>
            </TouchableOpacity>

            {/* Отступ для таб-бара */}
            <View style={{ height: 20 }} />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        color: '#666',
    },
    content: {
        padding: 16,
    },
    section: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 12,
        color: '#666',
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingText: {
        color: '#1a1a1a',
    },
    settingValue: {
        color: '#666',
    },
    settingArrow: {
        color: '#666',
    },
    logoutButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoutButtonText: {
        fontWeight: '600',
        color: 'white',
    },
    });