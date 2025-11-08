    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { wp, hp, fontSize, spacing, isTablet } from '../../utils/responsive';

    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    export default function Dashboard(props: any) {
    const { navigation } = props;
    const currentTime = new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.header}>
            <Text style={styles.title}>Главная</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Карта бибики */}
            <TouchableOpacity 
            style={styles.carCard}
            onPress={() => navigation.navigate('CarDetails')}
            >
            <Text style={styles.carTitle}>SUBARU FORESTER</Text>
            <Text style={styles.carInfo}>K7770T555 121404</Text>
            <Text style={styles.carInfo}>asdftrewhjk1238c</Text>
            
            <View style={styles.issuesSection}>
                <Text style={styles.sectionTitle}>КОМПОНЕНТЫ</Text>
                
                {[
                { name: 'Амортизатор', status: 'требуется замена или ремонт' },
                { name: 'Соленоид', status: 'требуется замена или ремонт' },
                { name: 'Ступица', status: 'требуется замена или ремонт' },
                { name: 'Кардан', status: 'требуется замена или ремонт' },
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
                <Text style={styles.criticalInfo}>1233211</Text>
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

            
            <View style={{ height: hp(10) }} />
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
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    time: {
        fontSize: fontSize(16),
        color: '#666',
        marginBottom: hp(0.5),
    },
    title: {
        fontSize: fontSize(20),
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
    },
    carCard: {
        backgroundColor: 'white',
        padding: wp(5),
        borderRadius: wp(4),
        marginBottom: hp(2),
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    carTitle: {
        fontSize: fontSize(20),
        fontWeight: 'bold',
        marginBottom: hp(1),
        color: '#1a1a1a',
    },
    carInfo: {
        fontSize: fontSize(14),
        color: '#666',
        marginBottom: hp(0.5),
    },
    issuesSection: {
        marginTop: hp(2),
        paddingTop: hp(2),
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: fontSize(16),
        fontWeight: 'bold',
        marginBottom: hp(1.5),
        color: '#1a1a1a',
    },
    issueItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
        paddingVertical: hp(0.5),
    },
    issueText: {
        flex: 1,
        fontSize: fontSize(14),
        color: '#333',
    },
    issueStatus: {
        fontSize: fontSize(12),
        color: '#FF3B30',
        fontWeight: '500',
    },
    criticalSection: {
        marginTop: hp(2),
        padding: wp(4),
        backgroundColor: '#FFE5E5',
        borderRadius: wp(3),
        borderLeftWidth: wp(1),
        borderLeftColor: '#FF3B30',
    },
    criticalTitle: {
        fontSize: fontSize(16),
        fontWeight: 'bold',
        color: '#FF3B30',
        marginBottom: hp(0.5),
    },
    criticalSubtitle: {
        fontSize: fontSize(14),
        color: '#FF3B30',
        marginBottom: hp(1),
    },
    criticalInfo: {
        fontSize: fontSize(12),
        color: '#666',
        marginBottom: hp(0.5),
    },
    criticalLink: {
        fontSize: fontSize(12),
        color: '#007AFF',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: wp(3),
    },
    actionButton: {
        flex: 1,
        backgroundColor: 'white',
        padding: wp(4),
        borderRadius: wp(3),
        marginHorizontal: wp(0.5),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        minHeight: hp(8),
        justifyContent: 'center',
    },
    actionText: {
        fontSize: fontSize(14),
        fontWeight: '500',
        color: '#007AFF',
        textAlign: 'center',
    },
    });