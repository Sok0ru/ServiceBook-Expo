    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';

    export default function History() {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

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
        <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={[styles.title, adaptiveStyles.textXl]}>История</Text>
            <Text style={[styles.subtitle, adaptiveStyles.textSm]}>История обслуживания</Text>
        </View>

        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <View
            style={[
                styles.historyGrid,
                {
                flexDirection: isTablet ? 'row' : 'column',
                flexWrap: isTablet ? 'wrap' : 'nowrap',
                gap: adaptiveValues.spacing.lg,
                },
            ]}
            >
            {historyItems.map((item) => (
                <View
                key={item.id}
                style={[
                    styles.historyCard,
                    adaptiveStyles.card,
                    isTablet && styles.historyCardTablet,
                ]}
                >
                <View style={styles.historyHeader}>
                    <Text style={[styles.historyDate, adaptiveStyles.textSm]}>{item.date}</Text>
                    <Text style={[styles.historyCost, adaptiveStyles.textMd]}>{item.cost}</Text>
                </View>
                <Text style={[styles.historyService, adaptiveStyles.textMd]}>{item.service}</Text>
                </View>
            ))}
            </View>

            {/* Отступ для таб-бара */}
            <View style={{ height: 20 }} />
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
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingVertical: 16,
    },
    historyGrid: {
        marginTop: 8,
    },
    historyCard: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    historyCardTablet: {
        width: '48%',
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    historyDate: {
        color: '#666',
        fontWeight: '500',
    },
    historyCost: {
        color: '#007AFF',
        fontWeight: '600',
    },
    historyService: {
        color: '#1a1a1a',
        fontWeight: '500',
    },
    });