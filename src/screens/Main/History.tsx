    import React, { useEffect, useState } from 'react';
    import { View, Text, FlatList, StyleSheet } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { RouteProp, useRoute } from '@react-navigation/native';
    import { RootStackParamList, Reminder } from '../../types/navigation';
    import { remindersAPI } from '../../api/reminders';
    import { useAdaptiveStyles } from '../../hooks/useAdaptiveStyles';

    type RouteT = RouteProp<RootStackParamList, 'History'>;

    const safeDate = (ts?: number) => (ts ? new Date(ts).toLocaleDateString('ru-RU') : '—');

    export default function History() {
    const route = useRoute<RouteT>();
    const { adaptiveStyles, isTablet } = useAdaptiveStyles();
    const carId = route.params?.carId || '';

    const [reminders, setReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        (async () => {
        try {
            const res = await remindersAPI.getByCar(carId);
            const data: Reminder[] = (await remindersAPI.getByCar(carId)) as Reminder[];
            setReminders(data);
        } catch (e) {
            console.error(e);
        }
        })();
    }, [carId]);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <FlatList
            data={reminders}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.content}
            renderItem={({ item }) => (
            <View style={[styles.card, adaptiveStyles.card, isTablet && styles.cardTablet]}>
                <View style={styles.row}>
                <Text style={[styles.name, adaptiveStyles.textMd]}>{item.name}</Text>
                <Text style={[styles.tag, adaptiveStyles.textSm]}>{item.tag}</Text>
                </View>
                <View style={styles.detailRow}>
                {item.noticeType === 'mileage' && item.mileageNotice && (
                    <Text style={styles.detail}>📏 {item.mileageNotice.toLocaleString()} км</Text>
                )}
                {item.noticeType === 'date' && item.dateNotice && (
                    <Text style={styles.detail}>📅 {safeDate(item.dateNotice)}</Text>
                )}
                </View>
            </View>
            )}
            ListEmptyComponent={
            <Text style={[styles.empty, adaptiveStyles.textMd]}>Нет записей</Text>
            }
        />
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { padding: 16 },
    card: { padding: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
    cardTablet: { width: '48%', marginHorizontal: '1%' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    name: { fontWeight: '600', color: '#1a1a1a' },
    tag: { color: '#007AFF' },
    detailRow: { marginTop: 6 },
    detail: { color: '#666', fontSize: 12 },
    empty: { textAlign: 'center', marginTop: 60, color: '#666' },
    });