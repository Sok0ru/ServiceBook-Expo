    // src/screens/Main/Dashboard.tsx
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
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';

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
    const { adaptiveStyles, adaptiveValues, isSmallDevice, width } = useAdaptiveStyles();

    const currentTime = new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Адаптивное количество колонок для grid
    const getGridColumns = () => {
        if (width < 375) return 1;
        if (width < 768) return 2;
        return 3;
    };

    const columns = getGridColumns();

    // Mock данные с длинными названиями для теста
    const components = [
        { 
        id: 1, 
        name: 'Топливные форсунки системы непосредственного впрыска с электронным управлением и системой очистки', 
        status: 'требуется замена или ремонт' 
        },
        { 
        id: 2, 
        name: 'Соленоид управления фазой газораспределения с системой изменения высоты подъема клапанов', 
        status: 'требуется замена или ремонт' 
        },
        { 
        id: 3, 
        name: 'Ступица переднего колеса с подшипником и датчиком системы ABS', 
        status: 'требуется замена или ремонт' 
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={[styles.header, adaptiveStyles.container]}>
            <Text style={adaptiveStyles.title}>Главная</Text>
        </View>

        {/* Content */}
        <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={adaptiveStyles.container}
        >
            {/* Car Card */}
            <TouchableOpacity 
            style={[styles.carCard, adaptiveStyles.card]}
            onPress={() => navigation.navigate('CarDetails')}
            >
            <Text style={[styles.carTitle, adaptiveStyles.textLg]}>
                SUBARU FORESTER
            </Text>
            
            <Text style={[styles.carInfo, adaptiveStyles.textSm]}>
                Гос. знак: Й312ОУ154
            </Text>
            
            <Text style={[styles.carInfo, adaptiveStyles.textSm]}>
                VIN: vinanebude
            </Text>
            
            <Text style={[styles.carInfo, adaptiveStyles.textSm]}>
                пробег: 121404км
            </Text>
            
            {/* Issues Section */}
            <View style={styles.issuesSection}>
                <Text style={[styles.sectionTitle, adaptiveStyles.textLg]}>
                КОМПОНЕНТЫ
                </Text>
                
                {components.map((component) => (
                <View key={component.id} style={styles.issueItem}>
                    <Text 
                    style={[styles.issueText, adaptiveStyles.textMd]}
                    numberOfLines={isSmallDevice ? 2 : 3}
                    ellipsizeMode="tail"
                    >
                    {component.name}
                    </Text>
                    <Text 
                    style={[styles.issueStatus, adaptiveStyles.textXs]}
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
                <Text style={[styles.criticalTitle, adaptiveStyles.textLg]}>
                КРИТИЧНО
                </Text>
                
                <Text style={[styles.criticalSubtitle, adaptiveStyles.textMd]}>
                ТРЕБУЕТ ВНИМАНИЯ
                </Text>
                
                <Text style={[styles.criticalInfo, adaptiveStyles.textSm]}>
                1233211 км
                </Text>
                
                <Text 
                style={[styles.criticalLink, adaptiveStyles.textSm]}
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
            { 
                flexDirection: isSmallDevice ? 'column' : 'row',
                gap: adaptiveValues.spacing.sm
            }
            ]}>
            <TouchableOpacity 
                style={[
                styles.actionButton,
                isSmallDevice && styles.smallActionButton
                ]}
                onPress={() => navigation.navigate('Reminders')}
            >
                <Text style={[styles.actionText, adaptiveStyles.textMd]}>
                Напоминания
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[
                styles.actionButton,
                isSmallDevice && styles.smallActionButton
                ]}
                onPress={() => navigation.navigate('Filters')}
            >
                <Text style={[styles.actionText, adaptiveStyles.textMd]}>
                Фильтры
                </Text>
            </TouchableOpacity>
            </View>

            {/* Additional Stats for Tablets */}
            {!isSmallDevice && (
            <View style={styles.statsGrid}>
                <View style={[styles.statCard, adaptiveStyles.card]}>
                <Text style={[styles.statTitle, adaptiveStyles.textMd]}>
                    Статистика ТО
                </Text>
                <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                    Последнее: 2 недели назад
                </Text>
                <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                    Следующее: через 3000 км
                </Text>
                </View>
                
                <View style={[styles.statCard, adaptiveStyles.card]}>
                <Text style={[styles.statTitle, adaptiveStyles.textMd]}>
                    Расходы
                </Text>
                <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                    За месяц: 5 430 ₽
                </Text>
                <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                    За год: 64 150 ₽
                </Text>
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
        paddingVertical: 16,
        backgroundColor: '#f3f3f3ff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    content: {
        flex: 1,
        paddingVertical: 16,
    },
    carCard: {
        backgroundColor: '#f3f3f3ff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
        lineHeight: 20,
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
        marginTop: 16,
    },
    actionButton: {
        backgroundColor: '#1a1a1a',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    smallActionButton: {
        marginBottom: 8,
    },
    actionText: {
        fontWeight: '500',
        color: '#f3f3f3ff',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    statTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1a1a1a',
    },
    statValue: {
        color: '#666',
        marginBottom: 4,
    },
    });