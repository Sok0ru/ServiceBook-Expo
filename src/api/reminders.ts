    import { api } from './client';
    export interface Reminder {
        id: string;
        name: string; 
        tag: string;
        noticeType: 'mileage' | 'date' | null;
        mileageNotice?: number; 
        dateNotice?: number; 
        active: boolean;
        carId: string;
    }

    export interface CreateReminderData {
        name: string;
        tag: string;
        noticeType: 'mileage' | 'date';
        mileageNotice?: number;
        dateNotice?: number;
        active: boolean;
    }

export const remindersAPI = {
    create: (carId: string, data: CreateReminderData) =>
        api.post<any>(`/details/${carId}`, data).then(r => {
            console.log('✅ Создано напоминание:', r.data);

            const reminder = r.data.detail || r.data;
            return {
                ...reminder,
                active: reminder.noticeActive !== undefined ? reminder.noticeActive : true,
                noticeType: reminder.noticeType || data.noticeType,
                mileageNotice: reminder.mileageNotice || data.mileageNotice,
                dateNotice: reminder.dateNotice || data.dateNotice
            };
        }),

    update: (carId: string, id: string, data: Partial<Reminder>) =>
        api.patch<any>(`/details/${carId}/${id}`, data).then(r => {
            console.log('✅ Обновлено напоминание:', r.data);
            
            const updatedReminder: Reminder = {
                id: id,
                carId: carId,
                name: data.name || '',
                tag: data.tag || '',
                noticeType: data.noticeType || null,
                mileageNotice: data.mileageNotice !== null ? data.mileageNotice : undefined,
                dateNotice: data.dateNotice !== null ? data.dateNotice : undefined,
                active: data.active !== undefined ? data.active : true
            };
            
            return updatedReminder;
        }),

    updateNotice: (carId: string, id: string, noticeDate: number) =>
        api.post<Reminder>(`/details/notice/${carId}/${id}`, { noticeDate }).then(r => r.data),

    delete: (carId: string, id: string) =>
        api.delete(`/details/notice/${carId}/${id}`).then(() => null),

    active: (carId: string, id: string, active: boolean) =>
        api.patch(`/details/notice/${carId}/${id}`, { active }).then((response) => {
            console.log('✅ Ответ от сервера при переключении:', response.data);
            return null;
        }).catch((error) => {
            console.error('❌ Ошибка при переключении:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            throw error;
        }),
    
    getByCar: (carId: string) =>
        api.get<any>(`/details/${carId}`)
        .then(r => {
            const response = r.data;
            console.log('📥 Raw API response:', response);
            
            let remindersData: any[] = [];
            if (Array.isArray(response)) {
                remindersData = response;
            } else if (response && typeof response === 'object') {
                if ('details' in response && Array.isArray(response.details)) {
                    remindersData = response.details;
                }
            }
            
            console.log('📋 Извлеченные напоминания до обработки:', remindersData);
            
            const processedReminders = remindersData.map(reminder => ({
                ...reminder,
                active: reminder.noticeActive !== undefined ? reminder.noticeActive : true,
                noticeType: reminder.noticeType || null,
                mileageNotice: reminder.mileageNotice !== null ? reminder.mileageNotice : undefined,
                dateNotice: reminder.dateNotice !== null ? reminder.dateNotice : undefined
            }));
            
            console.log('📋 Обработанные напоминания:', processedReminders);
            return processedReminders;
        }),
        
};