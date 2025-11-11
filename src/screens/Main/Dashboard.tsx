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
  CarDetails: undefined;
  Reminders: undefined;
  Filters: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

export default function Dashboard({ navigation }: Props) {
  const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet, width } = useAdaptiveStyles();

  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const components = [
    {
      id: 1,
      name: 'Топливные форсунки системы непосредственного впрыска с электронным управлением и системой очистки',
      status: 'требуется замена или ремонт',
    },
    {
      id: 2,
      name: 'Соленоид управления фазой газораспределения с системой изменения высоты подъема клапанов',
      status: 'требуется замена или ремонт',
    },
    {
      id: 3,
      name: 'Ступица переднего колеса с подшипником и датчиком системы ABS',
      status: 'требуется замена или ремонт',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, adaptiveStyles.container]}>
        <Text style={[styles.headerTitle, adaptiveStyles.textLg]}>Главная</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, adaptiveStyles.container]}
      >
        {/* Карточка автомобиля */}
        <TouchableOpacity
          style={[styles.carCard, adaptiveStyles.card]}
          onPress={() => navigation.navigate('CarDetails')}
        >
          <Text style={[styles.carTitle, adaptiveStyles.textLg]}>SUBARU FORESTER</Text>
          <Text style={[styles.carInfo, adaptiveStyles.textSm]}>Гос. знак: Й312ОУ154</Text>
          <Text style={[styles.carInfo, adaptiveStyles.textSm]}>VIN: vinanebude</Text>
          <Text style={[styles.carInfo, adaptiveStyles.textSm]}>пробег: 121404км</Text>

          {/* Компоненты */}
          <View style={styles.issuesSection}>
            <Text style={[styles.sectionTitle, adaptiveStyles.textMd]}>КОМПОНЕНТЫ</Text>
            {components.map((component) => (
              <View key={component.id} style={styles.issueItem}>
                <Text
                  style={[styles.issueText, adaptiveStyles.textSm]}
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

          {/* Критично */}
          <View style={styles.criticalSection}>
            <Text style={[styles.criticalTitle, adaptiveStyles.textMd]}>КРИТИЧНО</Text>
            <Text style={[styles.criticalSubtitle, adaptiveStyles.textSm]}>ТРЕБУЕТ ВНИМАНИЯ</Text>
            <Text style={[styles.criticalInfo, adaptiveStyles.textXs]}>1233211 км</Text>
            <Text
              style={[styles.criticalLink, adaptiveStyles.textXs]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              www.service-info-with-very-long-domain-name.com
            </Text>
          </View>
        </TouchableOpacity>

        {/* Быстрые действия */}
        <View
          style={[
            styles.quickActions,
            {
              flexDirection: isTablet ? 'row' : isSmallDevice ? 'column' : 'row',
              gap: adaptiveValues.spacing.md,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
            onPress={() => navigation.navigate('Reminders')}
          >
            <Text style={[styles.actionText, adaptiveStyles.textMd]}>Напоминания</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
            onPress={() => navigation.navigate('Filters')}
          >
            <Text style={[styles.actionText, adaptiveStyles.textMd]}>Фильтры</Text>
          </TouchableOpacity>
        </View>

        {/* Статистика для планшетов */}
        <View style={styles.statsGrid}>
        <View style={[styles.statCard, adaptiveStyles.card, isTablet && styles.statCardTablet]}>
            <Text style={[styles.statTitle, adaptiveStyles.textMd]}>Статистика ТО</Text>
            <Text style={[styles.statValue, adaptiveStyles.textSm]}>Последнее: 2 недели назад</Text>
            <Text style={[styles.statValue, adaptiveStyles.textSm]}>Следующее: через 3000 км</Text>
        </View>

        <View style={[styles.statCard, adaptiveStyles.card, isTablet && styles.statCardTablet]}>
            <Text style={[styles.statTitle, adaptiveStyles.textMd]}>Расходы</Text>
            <Text style={[styles.statValue, adaptiveStyles.textSm]}>За месяц: 5 430 ₽</Text>
            <Text style={[styles.statValue, adaptiveStyles.textSm]}>За год: 64 150 ₽</Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3ff',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
    paddingVertical: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  carCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
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
    marginBottom: 4,
    color: '#1a1a1a',
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
    marginRight: 12,
    lineHeight: 20,
    color: '#1a1a1a',
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
    backgroundColor: '#1553fcff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonTablet: {
    flex: 1,
    padding: 20,
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
    statsGridTablet: {
    gap: 24,
    },
    statCard: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    },
    statCardTablet: {
    padding: 24,
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