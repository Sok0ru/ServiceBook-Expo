    import React from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    useWindowDimensions,
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
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 375;
    const isLargeScreen = width >= 768;

    const currentTime = new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Длинные названия компонентов для демонстрации переносов
    const components = [
        { name: 'Топливные форсунки системы непосредственного впрыска', status: 'требуется замена или ремонт' },
        { name: 'Соленоид управления фазой газораспределения', status: 'требуется замена или ремонт' },
        { name: 'Ступица переднего колеса с подшипником', status: 'требуется замена или ремонт' },
        { name: 'Крестовина карданного вала передающего момента', status: 'требуется замена или ремонт' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={[
            styles.header,
            { paddingHorizontal: isSmallScreen ? 16 : 20 }
        ]}>
            <Text style={[
            styles.title,
            { fontSize: isSmallScreen ? 18 : 20 }
            ]}>Главная</Text>
        </View>

        {/* Content */}
        <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: isSmallScreen ? 12 : 16 }
            ]}
        >
            {/* Car Card */}
            <TouchableOpacity 
            style={styles.carCard}
            onPress={() => navigation.navigate('CarDetails')}
            >
            <Text style={[
                styles.carTitle,
                { fontSize: isSmallScreen ? 18 : 20 }
            ]}>SUBARU FORESTER</Text>
            
            <Text style={[
                styles.carInfo,
                { fontSize: isSmallScreen ? 13 : 14 }
            ]}>Гос. знак: Й312ОУ154</Text>
            
            <Text style={[
                styles.carInfo,
                { fontSize: isSmallScreen ? 13 : 14 }
            ]}>VIN: vinanebude</Text>
            
            <Text style={[
                styles.carInfo,
                { fontSize: isSmallScreen ? 13 : 14 }
            ]}>пробег: 121404км</Text>
            
            {/* Issues Section */}
            <View style={styles.issuesSection}>
                <Text style={[
                styles.sectionTitle,
                { fontSize: isSmallScreen ? 14 : 16 }
                ]}>КОМПОНЕНТЫ</Text>
                
                {components.map((component, index) => (
                <View key={index} style={styles.issueItem}>
                    <Text 
                    style={[
                        styles.issueText,
                        { fontSize: isSmallScreen ? 13 : 14 }
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    >
                    {component.name}
                    </Text>
                    <Text 
                    style={[
                        styles.issueStatus,
                        { fontSize: isSmallScreen ? 11 : 12 }
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    >
                    {component.status}
                    </Text>
                </View>
                ))}
            </View>
            
            {/* Critical Section */}
            <View style={styles.criticalSection}>
                <Text style={[
                styles.criticalTitle,
                { fontSize: isSmallScreen ? 14 : 16 }
                ]}>КРИТИЧНО</Text>
                
                <Text style={[
                styles.criticalSubtitle,
                { fontSize: isSmallScreen ? 12 : 14 }
                ]}>ТРЕБУЕТ ВНИМАНИЯ</Text>
                
                <Text style={[
                styles.criticalInfo,
                { fontSize: isSmallScreen ? 11 : 12 }
                ]}>1233211 км</Text>
                
                <Text 
                style={[
                    styles.criticalLink,
                    { fontSize: isSmallScreen ? 11 : 12 }
                ]}
                numberOfLines={1}
                ellipsizeMode="middle"
                >
                www.service-info-with-very-long-domain-name.com
                </Text>
            </View>
            </TouchableOpacity>

            {/* Quick Actions */}
            <View style={[
            styles.quickActions,
            { flexDirection: isSmallScreen ? 'column' : 'row' }
            ]}>
            <TouchableOpacity 
                style={[
                styles.actionButton,
                isSmallScreen && styles.smallActionButton,
                isSmallScreen && { marginBottom: 8 }
                ]}
                onPress={() => navigation.navigate('Reminders')}
            >
                <Text style={[
                styles.actionText,
                { fontSize: isSmallScreen ? 13 : 14 }
                ]}>Напоминания</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[
                styles.actionButton,
                isSmallScreen && styles.smallActionButton
                ]}
                onPress={() => navigation.navigate('Filters')}
            >
                <Text style={[
                styles.actionText,
                { fontSize: isSmallScreen ? 13 : 14 }
                ]}>Фильтры</Text>
            </TouchableOpacity>
            </View>

            {/* Additional Info Cards for larger screens */}
            {isLargeScreen && (
            <View style={styles.additionalCards}>
                <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>Статистика обслуживания</Text>
                <Text style={styles.infoCardText}>Последнее ТО: 2 недели назад</Text>
                <Text style={styles.infoCardText}>Следующее ТО: через 3000 км</Text>
                </View>
                
                <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>Расходы</Text>
                <Text style={styles.infoCardText}>За месяц: 5 430 ₽</Text>
                <Text style={styles.infoCardText}>За год: 64 150 ₽</Text>
                </View>
            </View>
            )}
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
        paddingBottom: 16,
        backgroundColor: '#f3f3f3ff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    time: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    title: {
        fontWeight: 'bold',
        color: '#0f0f0fff',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    carCard: {
        backgroundColor: '#f3f3f3ff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
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
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    carInfo: {
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
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1a1a1a',
    },
    issueItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingVertical: 6,
    },
    issueText: {
        flex: 1,
        color: '#1a1a1a',
        marginRight: 12,
        lineHeight: 18,
    },
    issueStatus: {
        color: '#FF3B30',
        fontWeight: '500',
        flexShrink: 0,
        maxWidth: '40%',
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
        fontWeight: 'bold',
        color: '#FF3B30',
        marginBottom: 4,
    },
    criticalSubtitle: {
        color: '#FF3B30',
        marginBottom: 8,
    },
    criticalInfo: {
        color: '#666',
        marginBottom: 4,
    },
    criticalLink: {
        color: '#007AFF',
    },
    quickActions: {
        justifyContent: 'space-between',
        marginTop: 8,
    },
    actionButton: {
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
    smallActionButton: {
        marginHorizontal: 0,
        marginBottom: 8,
    },
    actionText: {
        fontWeight: '500',
        color: '#f3f3f3ff',
    },
    // Стили для дополнительных карточек на больших экранах
    additionalCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 12,
    },
    infoCard: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    infoCardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    infoCardText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    });