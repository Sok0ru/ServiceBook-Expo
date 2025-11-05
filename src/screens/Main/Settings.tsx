    import React from 'react';
    import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';

    export default function Settings() {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <Text style={styles.title}>Настройки</Text>
            <Text style={styles.subtitle}>Настройки приложения</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Профиль */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>ПРОФИЛЬ</Text>
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Личные данные</Text>
                <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Уведомления</Text>
                <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            </View>

            {/* Приложение */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>ПРИЛОЖЕНИЕ</Text>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Темная тема</Text>
                <Switch value={false} />
            </View>
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Язык</Text>
                <Text style={styles.settingValue}>Русский</Text>
            </TouchableOpacity>
            </View>

            {/* О приложении */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>О ПРИЛОЖЕНИИ</Text>
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Версия</Text>
                <Text style={styles.settingValue}>1.0.0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Политика конфиденциальности</Text>
                <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            </View>

            {/* Выход */}
            <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Выйти из аккаунта</Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
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
        fontSize: 16,
        color: '#1a1a1a',
    },
    settingValue: {
        fontSize: 14,
        color: '#666',
    },
    settingArrow: {
        fontSize: 18,
        color: '#666',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600', 
    },
    });