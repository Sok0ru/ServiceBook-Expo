  import React, { useState, useEffect } from 'react';
  import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Modal,
    FlatList,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { StackNavigationProp } from '@react-navigation/stack';
  import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
  import { carsAPI } from '../../api/cars';
  import { remindersAPI } from '../../api/reminders';
  import { Car, Reminder } from '../../types/navigation';

  type MainStackParamList = {
    CarDetails: { carId: string };
    Reminders: { carId: string };
    Filters: undefined;
    Garage: undefined;
  };

  type DashboardScreenNavigationProp = StackNavigationProp<MainStackParamList>;

  type Props = {
    navigation: DashboardScreenNavigationProp;
  };

  // Безопасный форматтер даты
  const safeDate = (iso?: number): string => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
      ? ''
      : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  export default function Dashboard({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet, width } = useAdaptiveStyles();
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showCarSelector, setShowCarSelector] = useState(false);

    // Загружаем автомобили и напоминания
    const loadData = async () => {
      try {
        const data = await carsAPI.list();
        setCars(data);
        if (data.length > 0 && !selectedCar) {
          setSelectedCar(data[0]);
        }
        console.log('🚗 Загружены автомобили для Dashboard:', data);
      } catch (e) {
        console.error('❌ Ошибка загрузки автомобилей:', e);
        Alert.alert('Ошибка', 'Не удалось загрузить список автомобилей');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    // Загружаем напоминания для выбранного автомобиля

    const loadReminders = async (carId: string) => {
      try {
        console.log('📥 Загружаю напоминания для carId:', carId);
        const response = await remindersAPI.getByCar(carId);
        console.log('📥 Ответ от remindersAPI.getByCar:', response);
        
        // Обработка ответа - напоминания в поле details
        const remindersData = (response as any)?.details || [];
        console.log('📋 Обработанные напоминания:', remindersData);
        setReminders(remindersData);
      } catch (e: any) {
        console.error('❌ Ошибка загрузки напоминаний:', e);
      }
    };

    useEffect(() => {
      loadData();
    }, []);

    // При изменении выбранного автомобиля загружаем его напоминания
    useEffect(() => {
      if (selectedCar) {
        loadReminders(selectedCar.id);
      }
    }, [selectedCar]);

    const handleRemindersPress = () => {
      if (!selectedCar) {
        Alert.alert('Нет автомобилей', 'Добавьте автомобиль перед созданием напоминаний');
        navigation.navigate('Garage');
        return;
      }
      console.log('🚗 Переход в Reminders с carId:', selectedCar.id);
      navigation.navigate('Reminders', { carId: selectedCar.id });
    };

    const handleRefresh = () => {
      setRefreshing(true);
      loadData();
      if (selectedCar) {
        loadReminders(selectedCar.id);
      }
    };

    const handleCarTitlePress = () => {
      if (cars.length > 1) {
        setShowCarSelector(true);
      }
    };

    const handleCarCardPress = () => {
      if (selectedCar) {
        navigation.navigate('CarDetails', { carId: selectedCar.id });
      }
    };

    const handleCarSelect = async (car: Car) => {
      setSelectedCar(car);
      setShowCarSelector(false);
      // Загружаем напоминания для нового выбранного автомобиля
      await loadReminders(car.id);
    };

    const handleAddCar = () => {
      navigation.navigate('Garage');
    };

    const currentTime = new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Активные напоминания (первые 3)
    const activeReminders = reminders
      .filter(r => r.active)
      .slice(0, 3);

    // Ближайшее напоминание по пробегу
    const nearestMileageReminder = reminders
      .filter(r => r.active && r.noticeType === 'mileage' && r.mileageNotice)
      .sort((a, b) => (a.mileageNotice || 0) - (b.mileageNotice || 0))[0];

    // Ближайшее напоминание по дате
    const nearestDateReminder = reminders
      .filter(r => r.active && r.noticeType === 'date' && r.dateNotice)
      .sort((a, b) => (a.dateNotice || 0) - (b.dateNotice || 0))[0];

    if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.loadingText, adaptiveStyles.textSm]}>Загрузка данных...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />

        <View style={[styles.header, adaptiveStyles.container]}>
          <Text style={[styles.headerTitle, adaptiveStyles.textLg]}>Главная</Text>
          <Text style={[styles.time, adaptiveStyles.textSm]}>{currentTime}</Text>
          {cars.length > 0 && (
            <Text style={[styles.carCount, adaptiveStyles.textXs]}>
              Автомобилей: {cars.length}
            </Text>
          )}
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, adaptiveStyles.container]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#007AFF']} />
          }
        >
          {/* Основной автомобиль */}
          {selectedCar ? (
            <View style={[styles.carCard, adaptiveStyles.card]}>
              {/* Заголовок автомобиля - нажатие открывает выбор авто */}
              <TouchableOpacity onPress={handleCarTitlePress}>
                <View style={styles.carHeader}>
                  <View style={styles.carTitleContainer}>
                    <Text style={[styles.carTitle, adaptiveStyles.textLg]}>
                      {selectedCar.brand} {selectedCar.model}
                    </Text>
                    {cars.length > 1 && (
                      <Text style={[styles.carSelectorHint, adaptiveStyles.textXs]}>
                        Нажмите для выбора авто ▼
                      </Text>
                    )}
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={[styles.statusText, adaptiveStyles.textXs]}>АКТИВНЫЙ</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Остальная часть карточки - нажатие ведет в CarDetails */}
              <TouchableOpacity onPress={handleCarCardPress}>
                <View style={styles.carInfoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, adaptiveStyles.textXs]}>ГОС. НОМЕР</Text>
                    <Text style={[styles.infoValue, adaptiveStyles.textSm]}>
                      {selectedCar.plate || 'не указан'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, adaptiveStyles.textXs]}>ПРОБЕГ</Text>
                    <Text style={[styles.infoValue, adaptiveStyles.textSm]}>
                      {selectedCar.mileage?.toLocaleString() || '0'} км
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, adaptiveStyles.textXs]}>ГОД</Text>
                    <Text style={[styles.infoValue, adaptiveStyles.textSm]}>
                      {selectedCar.year || 'не указан'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, adaptiveStyles.textXs]}>ЦВЕТ</Text>
                    <Text style={[styles.infoValue, adaptiveStyles.textSm]}>
                      {selectedCar.color || 'не указан'}
                    </Text>
                  </View>
                </View>

                {/* Активные напоминания */}
                <View style={styles.issuesSection}>
                  <Text style={[styles.sectionTitle, adaptiveStyles.textMd]}>
                    АКТИВНЫЕ НАПОМИНАНИЯ ({activeReminders.length})
                  </Text>
                  {activeReminders.length > 0 ? (
                    activeReminders.map((reminder) => (
                      <View key={reminder.id} style={styles.issueItem}>
                        <Text
                          style={[styles.issueText, adaptiveStyles.textSm]}
                          numberOfLines={isSmallDevice ? 2 : 3}
                          ellipsizeMode="tail"
                        >
                          {reminder.name}
                        </Text>
                        <Text
                          style={[styles.issueStatus, adaptiveStyles.textXs]}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {reminder.noticeType === 'mileage' 
                            ? `${reminder.mileageNotice?.toLocaleString()} км`
                            : safeDate(reminder.dateNotice)
                          }
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={[styles.noRemindersText, adaptiveStyles.textSm]}>
                      Нет активных напоминаний
                    </Text>
                  )}
                </View>

                {/* Ближайшее напоминание */}
                {(nearestMileageReminder || nearestDateReminder) && (
                  <View style={styles.criticalSection}>
                    <Text style={[styles.criticalTitle, adaptiveStyles.textMd]}>⚡ БЛИЖАЙШЕЕ ОБСЛУЖИВАНИЕ</Text>
                    {nearestMileageReminder && (
                      <Text style={[styles.criticalSubtitle, adaptiveStyles.textSm]}>
                        {nearestMileageReminder.name}
                      </Text>
                    )}
                    {nearestMileageReminder && (
                      <Text style={[styles.criticalInfo, adaptiveStyles.textXs]}>
                        При пробеге: {nearestMileageReminder.mileageNotice?.toLocaleString()} км
                      </Text>
                    )}
                    {nearestDateReminder && !nearestMileageReminder && (
                      <Text style={[styles.criticalInfo, adaptiveStyles.textXs]}>
                        Дата: {safeDate(nearestDateReminder.dateNotice)}
                      </Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            // Карточка для добавления первого автомобиля
            <TouchableOpacity
              style={[styles.addCarCard, adaptiveStyles.card]}
              onPress={handleAddCar}
            >
              <Text style={[styles.addCarTitle, adaptiveStyles.textLg]}>Добавьте первый автомобиль</Text>
              <Text style={[styles.addCarSubtitle, adaptiveStyles.textSm]}>
                Начните отслеживать обслуживание вашего автомобиля
              </Text>
              <Text style={[styles.addCarButton, adaptiveStyles.textMd]}>ДОБАВИТЬ АВТОМОБИЛЬ</Text>
            </TouchableOpacity>
          )}

          {/* Статистика - горизонтально */}
          {selectedCar && (
            <View style={[
              styles.statsGrid,
              isTablet && styles.statsGridTablet
            ]}>
              <View style={[styles.statCard, adaptiveStyles.card]}>
                <Text style={[styles.statTitle, adaptiveStyles.textMd]}>Статистика напоминаний</Text>
                <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                  Активных: {reminders.filter(r => r.active).length}
                </Text>
                <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                  Всего: {reminders.length}
                </Text>
              </View>

              <View style={[styles.statCard, adaptiveStyles.card]}>
                <Text style={[styles.statTitle, adaptiveStyles.textMd]}>Следующее ТО</Text>
                {nearestMileageReminder ? (
                  <>
                    <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                      {nearestMileageReminder.mileageNotice?.toLocaleString()} км
                    </Text>
                    <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                      {nearestMileageReminder.name}
                    </Text>
                  </>
                ) : (
                  <Text style={[styles.statValue, adaptiveStyles.textSm]}>
                    Не запланировано
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Быстрые действия */}
          <View
            style={[
              styles.quickActions,
              {
                flexDirection: isTablet ? 'row' : 'column',
                gap: adaptiveValues.spacing.md,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
              onPress={handleRemindersPress}
              disabled={!selectedCar}
            >
              <Text style={[styles.actionText, adaptiveStyles.textMd]}>Напоминания</Text>
              <Text style={[styles.actionDescription, adaptiveStyles.textXs]}>
                Управление уведомлениями
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
              onPress={() => navigation.navigate('Filters')}
            >
              <Text style={[styles.actionText, adaptiveStyles.textMd]}>Фильтры</Text>
              <Text style={[styles.actionDescription, adaptiveStyles.textXs]}>
                Фильтр для ваших напоминаний
              </Text>
            </TouchableOpacity>

            {cars.length > 1 && (
              <TouchableOpacity
                style={[styles.actionButton, isTablet && styles.actionButtonTablet]}
                onPress={() => navigation.navigate('Garage')}
              >
                <Text style={[styles.actionText, adaptiveStyles.textMd]}>Мой гараж</Text>
                <Text style={[styles.actionDescription, adaptiveStyles.textXs]}>
                  {cars.length} автомобилей
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Модальное окно выбора автомобиля */}
        <Modal
          visible={showCarSelector}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCarSelector(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, isTablet && styles.modalContentTablet]}>
              <Text style={[styles.modalTitle, adaptiveStyles.textLg]}>Выберите автомобиль</Text>
              
              <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.carOption,
                      selectedCar?.id === item.id && styles.carOptionSelected
                    ]}
                    onPress={() => handleCarSelect(item)}
                  >
                    <View style={styles.carOptionInfo}>
                      <Text style={[styles.carOptionTitle, adaptiveStyles.textMd]}>
                        {item.brand} {item.model}
                      </Text>
                      <Text style={[styles.carOptionDetails, adaptiveStyles.textSm]}>
                        {item.year} • {item.mileage?.toLocaleString() || '0'} км
                        {item.plate && ` • ${item.plate}`}
                      </Text>
                    </View>
                    {selectedCar?.id === item.id && (
                      <Text style={[styles.selectedIndicator, adaptiveStyles.textSm]}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
                style={styles.carList}
              />
              
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowCarSelector(false)}
              >
                <Text style={[styles.modalCloseText, adaptiveStyles.textMd]}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3ff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      color: '#666',
    },
    header: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      backgroundColor: '#fff',
    },
    headerTitle: {
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    time: {
      color: '#666',
      marginTop: 4,
    },
    carCount: {
      color: '#007AFF',
      marginTop: 4,
      fontWeight: '500',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      paddingVertical: 16,
    },
    carCard: {
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 16,
    },
    carHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    carTitleContainer: {
      flex: 1,
    },
    carTitle: {
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    carSelectorHint: {
      color: '#007AFF',
      marginTop: 4,
      fontStyle: 'italic',
    },
    statusBadge: {
      backgroundColor: '#34C759',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 12,
    },
    statusText: {
      color: '#fff',
      fontWeight: '600',
    },
    carInfoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20,
    },
    infoItem: {
      minWidth: '45%',
      flex: 1,
    },
    infoLabel: {
      color: '#666',
      fontWeight: '600',
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    infoValue: {
      color: '#1a1a1a',
      fontWeight: '500',
    },
    issuesSection: {
      marginBottom: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#1a1a1a',
    },
    issueItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
      paddingVertical: 8,
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
      padding: 16,
      backgroundColor: '#FFF3E0',
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#FF9500',
    },
    criticalTitle: {
      fontWeight: 'bold',
      color: '#FF9500',
      marginBottom: 4,
    },
    criticalSubtitle: {
      color: '#FF9500',
      marginBottom: 8,
      fontWeight: '500',
    },
    criticalInfo: {
      color: '#666',
    },
    addCarCard: {
      padding: 40,
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 16,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#e0e0e0',
      borderStyle: 'dashed',
    },
    addCarIcon: {
      marginBottom: 12,
    },
    addCarTitle: {
      fontWeight: 'bold',
      color: '#1a1a1a',
      textAlign: 'center',
      marginBottom: 8,
    },
    addCarSubtitle: {
      color: '#666',
      textAlign: 'center',
      marginBottom: 20,
    },
    addCarButton: {
      color: '#007AFF',
      fontWeight: '600',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderWidth: 2,
      borderColor: '#007AFF',
      borderRadius: 12,
    },
    // Статистика - горизонтально
    statsGrid: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    statsGridTablet: {
      gap: 16,
    },
    statCard: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      alignItems: 'center',
    },
    statIcon: {
      marginBottom: 8,
    },
    statTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#1a1a1a',
      textAlign: 'center',
    },
    statValue: {
      color: '#666',
      marginBottom: 4,
      textAlign: 'center',
    },
    // Быстрые действия
    quickActions: {
      marginBottom: 16,
    },
    actionButton: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    actionButtonTablet: {
      flex: 1,
    },
    actionIcon: {
      marginBottom: 8,
    },
    actionText: {
      fontWeight: '600',
      color: '#1a1a1a',
      textAlign: 'center',
      marginBottom: 4,
    },
    actionDescription: {
      color: '#666',
      textAlign: 'center',
    },
    // Модальное окно выбора автомобиля
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: '80%',
    },
    modalContentTablet: {
      maxWidth: 500,
      alignSelf: 'center',
      borderRadius: 20,
      width: '90%',
    },
    modalTitle: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#1a1a1a',
    },
    carList: {
      maxHeight: 400,
    },
    carOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    carOptionSelected: {
      backgroundColor: '#f8f9ff',
    },
    carOptionInfo: {
      flex: 1,
    },
    carOptionTitle: {
      fontWeight: '600',
      color: '#1a1a1a',
      marginBottom: 4,
    },
    carOptionDetails: {
      color: '#666',
    },
    selectedIndicator: {
      color: '#007AFF',
      fontWeight: 'bold',
    },
    modalCloseButton: {
      backgroundColor: '#007AFF',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 16,
    },
    modalCloseText: {
      color: '#fff',
      fontWeight: '600',
    },
    noRemindersText: {
      color: '#666',
      fontStyle: 'italic',
      textAlign: 'center',
      paddingVertical: 8,
    },
  });