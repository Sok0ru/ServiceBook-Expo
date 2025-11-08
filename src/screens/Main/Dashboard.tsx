    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';

    type MainStackParamList = {
        Dashboard: undefined;
        CarDetails: undefined;
        Reminders: undefined;
        Filters: undefined;
    };

    type DashboardScreenNavigationProp = StackNavigationProp<
        MainStackParamList,
    'Dashboard'
    >;

    type Props = {
        navigation: DashboardScreenNavigationProp;
    };  

    export default function Dashboard({ navigation }: Props) {
    const currentTime = new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.title}>Главная</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Car Card */}
            <TouchableOpacity 
            style={styles.carCard}
            onPress={() => navigation.navigate('CarDetails')}
            >
            <Text style={styles.carTitle}>SUBARU FORESTER</Text>
            <Text style={styles.carInfo}>Гос. знак: Й312ОУ154</Text>
            <Text style={styles.carInfo}>VIN: vinanebude</Text>
            <Text style={styles.carInfo}>пробег: 121404км</Text>
            
            {/* Issues Section */}
            <View style={styles.issuesSection}>
                <Text style={styles.sectionTitle}>КОМПОНЕНТЫ</Text>
                
                {[
                { name: 'Форсунки', status: 'требуется замена или ремонт' },
                { name: 'Соленоид', status: 'требуется замена или ремонт' },
                { name: 'Ступица', status: 'требуется замена или ремонт' },
                { name: 'Крестовина кардана', status: 'требуется замена или ремонт' },
                ].map((issue, index) => (
                <View key={index} style={styles.issueItem}>
                    <Text style={styles.issueText}>{issue.name}</Text>
                    <Text style={styles.issueStatus}>{issue.status}</Text>
                </View>
                ))}
            </View>
            
            {/* Critical Section */}
            <View style={styles.criticalSection}>
                <Text style={styles.criticalTitle}>КРИТИЧНО</Text>
                <Text style={styles.criticalSubtitle}>ТРЕБУЕТ ВНИМАНИЯ</Text>
                <Text style={styles.criticalInfo}>1233211 км</Text>
                <Text style={styles.criticalLink}>www.service-info.com</Text>
            </View>
            </TouchableOpacity>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
            <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('Reminders')}
            >
                <Text style={styles.actionText}>Напоминания</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('Filters')}
            >
                <Text style={styles.actionText}>Фильтры</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
    },
    header: {
        padding: 20,
        backgroundColor: '#f3f3f3ff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3ff',
    },
    time: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f0f0fff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    carCard: {
        backgroundColor: '#f3f3f3ff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#f3f3f3ff',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    carTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    carInfo: {
        fontSize: 14,
        color: '#1a1a1a',
        marginBottom: 4,
    },
    issuesSection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#1a1a1a',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1a1a1a',
    },
    issueItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 4,
    },
    issueText: {
        flex: 1,
        fontSize: 14,
        color: '#1a1a1a',
    },
    issueStatus: {
        fontSize: 12,
        color: '#FF3B30',
        fontWeight: '500',
    },
    criticalSection: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#FFE5E5',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF3B30',
    },
    criticalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF3B30',
        marginBottom: 4,
    },
    criticalSubtitle: {
        fontSize: 14,
        color: '#FF3B30',
        marginBottom: 8,
    },
    criticalInfo: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    criticalLink: {
        fontSize: 12,
        color: '#007AFF',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 4,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#f3f3f3ff',
    },
    });