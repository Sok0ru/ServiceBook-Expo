    import React, { useState } from 'react';
    import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    TextInput,
    } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { StackNavigationProp } from '@react-navigation/stack';

    type MainStackParamList = {
    Filters: undefined;
    Dashboard: undefined;
    };

    type FiltersScreenNavigationProp = StackNavigationProp<
    MainStackParamList,
    'Filters'
    >;

    type Props = {
    navigation: FiltersScreenNavigationProp;
    };

    export default function Filters({ navigation }: Props) {
    const [filters, setFilters] = useState({
        // Сортировка
        sorting: {
        enabled: true,
        type: 'А-Я' as 'А-Я' | 'Я-А' | 'Что-то ещё',
        },
        
        // Тест
        test: {
        enabled: true,
        usbBsaSs: false,
        },
        
        // Пробег
        mileage: {
        enabled: true,
        min: '100',
        max: '1000000',
        selectedLine: 0, // 0: Менее 5000 км, 1: Менее 3000 км, 2: Менее 50000 км
        },
        
        // Состояние
        condition: {
        enabled: true,
        Критично: false,
        Внимание: false,        
        Исправно: false,
        },
        
        // Время
        time: {
        enabled: false,
        min: '5',
        max: '1000000',
        selectedLine: 0, // 0: Менее 10 дней, 1: Менее 1 мес., 2: Менее 3 мес., 3: Менее 4 мес.
        },
    });

    const toggleFilter = (filterKey: keyof typeof filters) => {
        setFilters({
        ...filters,
        [filterKey]: {
            ...filters[filterKey],
            enabled: !filters[filterKey].enabled,
        },
        });
    };

    const applyFilters = () => {
        // TODO: Применить фильтры
        navigation.goBack();
    };

    const resetFilters = () => {
        // Сброс к значениям по умолчанию
        setFilters({
        sorting: { enabled: true, type: 'А-Я' },
        test: { enabled: true, usbBsaSs: false },
        mileage: { enabled: true, min: '10001000', max: '10001000', selectedLine: 0 },
        condition: { enabled: true, Критично: false, Внимание: false, Исправно: false },
        time: { enabled: false, min: '5', max: '1000000', selectedLine: 0 },
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Параметры</Text>

            {/* Сортировка */}
            <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
                <View style={styles.filterTitleContainer}>
                <Switch
                    value={filters.sorting.enabled}
                    onValueChange={() => toggleFilter('sorting')}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={filters.sorting.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={styles.filterTitle}>Сортировка</Text>
                </View>
            </View>
            
            {filters.sorting.enabled && (
                <View style={styles.optionsContainer}>
                {(['А-Я', 'Я-А', 'Что-то ещё'] as const).map((type) => (
                    <TouchableOpacity
                    key={type}
                    style={[
                        styles.optionButton,
                        filters.sorting.type === type && styles.optionButtonSelected,
                    ]}
                    onPress={() => setFilters({
                        ...filters,
                        sorting: { ...filters.sorting, type }
                    })}
                    >
                    <Text style={[
                        styles.optionText,
                        filters.sorting.type === type && styles.optionTextSelected,
                    ]}>
                        {type}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>

            {/* Тест */}
            <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
                <View style={styles.filterTitleContainer}>
                <Switch
                    value={filters.test.enabled}
                    onValueChange={() => toggleFilter('test')}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={filters.test.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={styles.filterTitle}>Теги</Text>
                </View>
            </View>
            
            {filters.test.enabled && (
                <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={styles.checkboxOption}
                    onPress={() => setFilters({
                    ...filters,
                    test: { ...filters.test, usbBsaSs: !filters.test.usbBsaSs }
                    })}
                >
                    <View style={[
                    styles.checkbox,
                    filters.test.usbBsaSs && styles.checkboxSelected,
                    ]} />
                    <Text style={styles.checkboxText}>пока не знаю</Text>
                </TouchableOpacity>
                </View>
            )}
            </View>

            {/* Пробег */}
            <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
                <View style={styles.filterTitleContainer}>
                <Switch
                    value={filters.mileage.enabled}
                    onValueChange={() => toggleFilter('mileage')}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={filters.mileage.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={styles.filterTitle}>Пробег</Text>
                </View>
            </View>
            
            {filters.mileage.enabled && (
                <View style={styles.rangeContainer}>
                {/* Поля ввода диапазона */}
                <View style={styles.rangeInputs}>
                    <View style={styles.rangeInput}>
                    <Text style={styles.rangeLabel}>от</Text>
                    <TextInput
                        style={styles.rangeTextInput}
                        value={filters.mileage.min}
                        onChangeText={(text) => setFilters({
                        ...filters,
                        mileage: { ...filters.mileage, min: text }
                        })}
                        keyboardType="numeric"
                    />
                    </View>
                    
                    <Text style={styles.rangeSeparator}>X</Text>
                    
                    <View style={styles.rangeInput}>
                    <Text style={styles.rangeLabel}>до</Text>
                    <TextInput
                        style={styles.rangeTextInput}
                        value={filters.mileage.max}
                        onChangeText={(text) => setFilters({
                        ...filters,
                        mileage: { ...filters.mileage, max: text }
                        })}
                        keyboardType="numeric"
                    />
                    </View>
                </View>

                {/*Выбор пробега*/}
                <View style={styles.linesContainer}>
                    {[
                    'Менее 5000 км',
                    'Менее 3000 км', 
                    'Менее 50000 км',
                    ].map((line, index) => (
                    <TouchableOpacity
                        key={line}
                        style={[
                        styles.lineButton,
                        filters.mileage.selectedLine === index && styles.lineButtonSelected,
                        ]}
                        onPress={() => setFilters({
                        ...filters,
                        mileage: { ...filters.mileage, selectedLine: index }
                        })}
                    >
                        <Text style={[
                        styles.lineText,
                        filters.mileage.selectedLine === index && styles.lineTextSelected,
                        ]}>
                        {line}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                </View>
            )}
            </View>

            {/* Состояние */}
            <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
                <View style={styles.filterTitleContainer}>
                <Switch
                    value={filters.condition.enabled}
                    onValueChange={() => toggleFilter('condition')}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={filters.condition.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={styles.filterTitle}>Состояние</Text>
                </View>
            </View>
            
            {filters.condition.enabled && (
                <View style={styles.optionsContainer}>
                {[
                    { key: 'Критично', label: 'Критично' },
                    { key: 'Внимание', label: 'Требует внимания' },
                    { key: 'Исправно', label: 'Исправно' },
                ].map((item) => (
                    <TouchableOpacity
                    key={item.key}
                    style={styles.checkboxOption}
                    onPress={() => setFilters({
                        ...filters,
                        condition: { 
                        ...filters.condition, 
                        [item.key]: !filters.condition[item.key as keyof typeof filters.condition] 
                        }
                    })}
                    >
                    <View style={[
                        styles.checkbox,
                        filters.condition[item.key as keyof typeof filters.condition] && styles.checkboxSelected,
                    ]} />
                    <Text style={styles.checkboxText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>

            {/* Время */}
            <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
                <View style={styles.filterTitleContainer}>
                <Switch
                    value={filters.time.enabled}
                    onValueChange={() => toggleFilter('time')}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={filters.time.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={styles.filterTitle}>Время</Text>
                </View>
            </View>
            
            {filters.time.enabled && (
                <View style={styles.rangeContainer}>
                {/* Поля ввода диапазона времени */}
                <View style={styles.rangeInputs}>
                    <View style={styles.rangeInput}>
                    <Text style={styles.rangeLabel}>от</Text>
                    <TextInput
                        style={styles.rangeTextInput}
                        value={filters.time.min}
                        onChangeText={(text) => setFilters({
                        ...filters,
                        time: { ...filters.time, min: text }
                        })}
                        keyboardType="numeric"
                    />
                    </View>
                    
                    <Text style={styles.rangeSeparator}>X</Text>
                    
                    <View style={styles.rangeInput}>
                    <Text style={styles.rangeLabel}>до</Text>
                    <TextInput
                        style={styles.rangeTextInput}
                        value={filters.time.max}
                        onChangeText={(text) => setFilters({
                        ...filters,
                        time: { ...filters.time, max: text }
                        })}
                        keyboardType="numeric"
                    />
                    </View>
                </View>

                {/* Линии выбора времени */}
                <View style={styles.linesContainer}>
                    {[
                    'Менее 10 дней',
                    'Менее 1 мес.',
                    'Менее 3 мес.',
                    'Менее 4 мес.',
                    ].map((line, index) => (
                    <TouchableOpacity
                        key={line}
                        style={[
                        styles.lineButton,
                        filters.time.selectedLine === index && styles.lineButtonSelected,
                        ]}
                        onPress={() => setFilters({
                        ...filters,
                        time: { ...filters.time, selectedLine: index }
                        })}
                    >
                        <Text style={[
                        styles.lineText,
                        filters.time.selectedLine === index && styles.lineTextSelected,
                        ]}>
                        {line}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                </View>
            )}
            </View>

            {/* Кнопки действий */}
            <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={styles.applyButton}
                onPress={applyFilters}
            >
                <Text style={styles.applyButtonText}>Применить</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetFilters}
            >
                <Text style={styles.resetButtonText}>Сбросить</Text>
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
    content: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 24,
        textAlign: 'center',
    },
    filterSection: {
        backgroundColor: '#f3f3f3ff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    filterTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#f3f3f3ff',
        marginLeft: 12,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
    },
    optionButtonSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#f3f3f3ff',
    },
    checkboxOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 4,
        marginRight: 12,
    },
    checkboxSelected: {
        backgroundColor: '#007AFF',
    },
    checkboxText: {
        fontSize: 14,
        color: '#333',
    },
    rangeContainer: {
        gap: 16,
    },
    rangeInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rangeInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rangeLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
        fontWeight: '500',
    },
    rangeTextInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    rangeSeparator: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        marginHorizontal: 12,
    },
    linesContainer: {
        gap: 8,
    },
    lineButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
    lineButtonSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    lineText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    lineTextSelected: {
        color: '#f3f3f3ff',
    },
    actionsContainer: {
        gap: 12,
        marginTop: 24,
    },
    applyButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    applyButtonText: {
        color: '#f3f3f3ff',
        fontSize: 16,
        fontWeight: '600',
    },
    resetButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    resetButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
    });