    import React from 'react';
    import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';

    export default function History() {
    const historyItems = [
        {
        id: '1',
        date: '15.12.2023',
        service: 'Замена масла двигателя',
        cost: '5 000 ₽',
        },
        {
        id: '2',
        date: '20.11.2023', 
        service: 'Замена тормозных колодок',
        cost: '8 500 ₽',
        },
        {
        id: '3',
        date: '05.10.2023',
        service: 'Техническое обслуживание',
        cost: '12 000 ₽',
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <Text style={styles.title}>История</Text>
            <Text style={styles.subtitle}>История обслуживания</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {historyItems.map((item) => (
            <View key={item.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyCost}>{item.cost}</Text>
                </View>
                <Text style={styles.historyService}>{item.service}</Text>
            </View>
            ))}
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
    historyCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    historyDate: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    historyCost: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    historyService: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    });