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
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';
    import { RootStackParamList } from '../../types/navigation';

    type MainStackParamList = {
    Filters: undefined;
    Dashboard: undefined;
    };

    type FiltersScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Filters'>;

    type Props = {
    navigation: FiltersScreenNavigationProp;
    };

    export default function Filters({ navigation }: Props) {
    const { adaptiveStyles, adaptiveValues, isSmallDevice, isTablet } = useAdaptiveStyles();

    const [filters, setFilters] = useState({
        sorting: {
        enabled: true,
        type: 'А-Я' as 'А-Я' | 'Я-А' | 'Что-то ещё',
        },
        test: {
        enabled: true,
        usbBsaSs: false,
        },
        mileage: {
        enabled: true,
        min: '100',
        max: '1000000',
        selectedLine: 0,
        },
        condition: {
        enabled: true,
        Критично: false,
        Внимание: false,
        Исправно: false,
        },
        time: {
        enabled: false,
        min: '5',
        max: '100',
        selectedLine: 0,
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
        navigation.goBack();
    };

    const resetFilters = () => {
        setFilters({
        sorting: { enabled: true, type: 'А-Я' },
        test: { enabled: true, usbBsaSs: false },
        mileage: { enabled: true, min: '100', max: '1000000', selectedLine: 0 },
        condition: { enabled: true, Критично: false, Внимание: false, Исправно: false },
        time: { enabled: false, min: '5', max: '100', selectedLine: 0 },
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <Text style={[styles.title, adaptiveStyles.textXl]}>Параметры</Text>

            {/* Сортировка */}
            <View style={[styles.filterSection, adaptiveStyles.card]}>
            <View style={styles.filterHeader}>
                <Switch
                value={filters.sorting.enabled}
                onValueChange={() => toggleFilter('sorting')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={filters.sorting.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={[styles.filterTitle, adaptiveStyles.textMd]}>Сортировка</Text>
            </View>

            {filters.sorting.enabled && (
                <View
                style={[
                    styles.optionsContainer,
                    { flexDirection: isTablet ? 'row' : 'column' },
                ]}
                >
                {(['А-Я', 'Я-А', 'Что-то ещё'] as const).map((type) => (
                    <TouchableOpacity
                    key={type}
                    style={[
                        styles.optionButton,
                        filters.sorting.type === type && styles.optionButtonSelected,
                    ]}
                    onPress={() =>
                        setFilters({
                        ...filters,
                        sorting: { ...filters.sorting, type },
                        })
                    }
                    >
                    <Text
                        style={[
                        styles.optionText,
                        filters.sorting.type === type && styles.optionTextSelected,
                        ]}
                    >
                        {type}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>

            {/* Теги */}
            <View style={[styles.filterSection, adaptiveStyles.card]}>
            <View style={styles.filterHeader}>
                <Switch
                value={filters.test.enabled}
                onValueChange={() => toggleFilter('test')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={filters.test.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={[styles.filterTitle, adaptiveStyles.textMd]}>Теги</Text>
            </View>

            {filters.test.enabled && (
                <TouchableOpacity
                style={styles.checkboxOption}
                onPress={() =>
                    setFilters({
                    ...filters,
                    test: { ...filters.test, usbBsaSs: !filters.test.usbBsaSs },
                    })
                }
                >
                <View
                    style={[
                    styles.checkbox,
                    filters.test.usbBsaSs && styles.checkboxSelected,
                    ]}
                />
                <Text style={[styles.checkboxText, adaptiveStyles.textSm]}>пока не знаю</Text>
                </TouchableOpacity>
            )}
            </View>

            {/* Пробег */}
            <View style={[styles.filterSection, adaptiveStyles.card]}>
            <View style={styles.filterHeader}>
                <Switch
                value={filters.mileage.enabled}
                onValueChange={() => toggleFilter('mileage')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={filters.mileage.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={[styles.filterTitle, adaptiveStyles.textMd]}>Пробег</Text>
            </View>

            {filters.mileage.enabled && (
                <View style={styles.rangeContainer}>
                <View style={styles.rangeInputs}>
                    <View style={styles.rangeInput}>
                    <Text style={[styles.rangeLabel, adaptiveStyles.textXs]}>от</Text>
                    <TextInput
                        style={[styles.rangeTextInput, adaptiveStyles.textSm]}
                        value={filters.mileage.min}
                        onChangeText={(text) =>
                        setFilters({
                            ...filters,
                            mileage: { ...filters.mileage, min: text },
                        })
                        }
                        keyboardType="numeric"
                    />
                    </View>
                    <Text style={[styles.rangeSeparator, adaptiveStyles.textMd]}>×</Text>
                    <View style={styles.rangeInput}>
                    <Text style={[styles.rangeLabel, adaptiveStyles.textXs]}>до</Text>
                    <TextInput
                        style={[styles.rangeTextInput, adaptiveStyles.textSm]}
                        value={filters.mileage.max}
                        onChangeText={(text) =>
                        setFilters({
                            ...filters,
                            mileage: { ...filters.mileage, max: text },
                        })
                        }
                        keyboardType="numeric"
                    />
                    </View>
                </View>

                <View
                    style={[
                    styles.linesContainer,
                    { flexDirection: isTablet ? 'row' : 'column' },
                    ]}
                >
                    {['Менее 5000 км', 'Менее 3000 км', 'Менее 50000 км'].map((line, index) => (
                    <TouchableOpacity
                        key={line}
                        style={[
                        styles.lineButton,
                        filters.mileage.selectedLine === index && styles.lineButtonSelected,
                        ]}
                        onPress={() =>
                        setFilters({
                            ...filters,
                            mileage: { ...filters.mileage, selectedLine: index },
                        })
                        }
                    >
                        <Text
                        style={[
                            styles.lineText,
                            filters.mileage.selectedLine === index && styles.lineTextSelected,
                        ]}
                        >
                        {line}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                </View>
            )}
            </View>

            {/* Состояние */}
            <View style={[styles.filterSection, adaptiveStyles.card]}>
            <View style={styles.filterHeader}>
                <Switch
                value={filters.condition.enabled}
                onValueChange={() => toggleFilter('condition')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={filters.condition.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={[styles.filterTitle, adaptiveStyles.textMd]}>Состояние</Text>
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
                    onPress={() =>
                        setFilters({
                        ...filters,
                        condition: {
                            ...filters.condition,
                            [item.key]: !filters.condition[item.key as keyof typeof filters.condition],
                        },
                        })
                    }
                    >
                    <View
                        style={[
                        styles.checkbox,
                        filters.condition[item.key as keyof typeof filters.condition] && styles.checkboxSelected,
                        ]}
                    />
                    <Text style={[styles.checkboxText, adaptiveStyles.textSm]}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>

            {/* Время */}
            <View style={[styles.filterSection, adaptiveStyles.card]}>
            <View style={styles.filterHeader}>
                <Switch
                value={filters.time.enabled}
                onValueChange={() => toggleFilter('time')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={filters.time.enabled ? '#007AFF' : '#f4f3f4'}
                />
                <Text style={[styles.filterTitle, adaptiveStyles.textMd]}>Время</Text>
            </View>

            {filters.time.enabled && (
                <View style={styles.rangeContainer}>
                <View style={styles.rangeInputs}>
                    <View style={styles.rangeInput}>
                    <Text style={[styles.rangeLabel, adaptiveStyles.textXs]}>от</Text>
                    <TextInput
                        style={[styles.rangeTextInput, adaptiveStyles.textSm]}
                        value={filters.time.min}
                        onChangeText={(text) =>
                        setFilters({
                            ...filters,
                            time: { ...filters.time, min: text },
                        })
                        }
                        keyboardType="numeric"
                    />
                    </View>
                    <Text style={[styles.rangeSeparator, adaptiveStyles.textMd]}>×</Text>
                    <View style={styles.rangeInput}>
                    <Text style={[styles.rangeLabel, adaptiveStyles.textXs]}>до</Text>
                    <TextInput
                        style={[styles.rangeTextInput, adaptiveStyles.textSm]}
                        value={filters.time.max}
                        onChangeText={(text) =>
                        setFilters({
                            ...filters,
                            time: { ...filters.time, max: text },
                        })
                        }
                        keyboardType="numeric"
                    />
                    </View>
                </View>

                <View
                    style={[
                    styles.linesContainer,
                    { flexDirection: isTablet ? 'row' : 'column' },
                    ]}
                >
                    {['Менее 10 дней', 'Менее 1 мес.', 'Менее 3 мес.', 'Менее 4 мес.'].map((line, index) => (
                    <TouchableOpacity
                        key={line}
                        style={[
                        styles.lineButton,
                        filters.time.selectedLine === index && styles.lineButtonSelected,
                        ]}
                        onPress={() =>
                        setFilters({
                            ...filters,
                            time: { ...filters.time, selectedLine: index },
                        })
                        }
                    >
                        <Text
                        style={[
                            styles.lineText,
                            filters.time.selectedLine === index && styles.lineTextSelected,
                        ]}
                        >
                        {line}
                        </Text>
                    </TouchableOpacity>
                    ))}
                </View>
                </View>
            )}
            </View>

            {/* Кнопки */}
            <View
            style={[
                styles.actionsContainer,
                { flexDirection: isTablet ? 'row' : 'column' },
            ]}
            >
            <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: '#007AFF' }]}
                onPress={applyFilters}
            >
                <Text style={[styles.applyButtonText, adaptiveStyles.textMd]}>Применить</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.resetButton, { borderColor: '#007AFF' }]}
                onPress={resetFilters}
            >
                <Text style={[styles.resetButtonText, adaptiveStyles.textMd]}>Сбросить</Text>
            </TouchableOpacity>
            </View>

            {/* Отступ для таб-бара */}
            <View style={{ height: 20 }} />
        </ScrollView>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3ff',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#1a1a1a',
    },
    filterSection: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    filterTitle: {
        marginLeft: 12,
        color: '#1a1a1a',
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        flex: 1,
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
        color: '#666',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#fff',
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
        marginRight: 8,
        color: '#666',
        fontWeight: '500',
    },
    rangeTextInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 8,
        textAlign: 'center',
    },
    rangeSeparator: {
        marginHorizontal: 12,
        color: '#666',
        fontWeight: 'bold',
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
        color: '#666',
        textAlign: 'center',
    },
    lineTextSelected: {
        color: '#fff',
    },
    actionsContainer: {
        gap: 12,
        marginTop: 24,
    },
    applyButton: {
        flex: 1,
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
        color: '#fff',
        fontWeight: '600',
    },
    resetButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
    },
    resetButtonText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    });