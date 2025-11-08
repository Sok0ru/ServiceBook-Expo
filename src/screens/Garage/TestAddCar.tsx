        import React from 'react';
        import {
        View,
        Text,
        TouchableOpacity,
        StyleSheet,
        } from 'react-native';
        import { SafeAreaView } from 'react-native-safe-area-context';

        export default function TestAddCar(props: any) {
        const { navigation } = props;

        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>✅ Тестовый экран работает!</Text>
                <Text style={styles.subtitle}>Навигация функционирует корректно</Text>
                
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Garage')}
                >
                <Text style={styles.buttonText}>Вернуться в гараж</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style={[styles.button, { backgroundColor: '#666' }]}
                onPress={() => navigation.goBack()}
                >
                <Text style={styles.buttonText}>Назад</Text>
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
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#1a1a1a',
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 48,
            color: '#666666',
        },
        button: {
            backgroundColor: '#007AFF',
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 12,
            width: '100%',
            alignItems: 'center',
            marginBottom: 12,
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
        });