   import { api } from './client';

    export interface Reminder {
    id: string;
    title: string;
    type: 'замена' | 'проверка';
    mileage?: number;
    date?: string;
    enabled: boolean;
    carId: string;
    noticeDate?: string;
    }

    export interface CreateReminderData {
    title: string;
    type: 'замена' | 'проверка';
    mileage?: number;
    date?: string;
    enabled: boolean;
    noticeDate?: string;
    }

    export const remindersAPI = {
    // Создание напоминания
    create: (carId: string, data: CreateReminderData) => {
        console.log('📤 POST /api/details/', carId, data);
        return api.post<Reminder>(`/api/details/${carId}`, data).then(r => r.data);
    },

    // Обновление напоминания
    update: (carId: string, id: string, data: Partial<Reminder>) => {
        console.log('📤 PATCH /api/details/', carId, id, data);
        return api.patch<Reminder>(`/api/details/${carId}/${id}`, data).then(r => r.data);
    },

    // Обновление времени уведомления
    updateNotice: (carId: string, id: string, noticeDate: string) => {
        console.log('📤 POST /api/details/notice/', carId, id, noticeDate);
        return api.post<Reminder>(`/api/details/notice/${carId}/${id}`, { 
        noticeDate 
        }).then(r => r.data);
    },

    // Удаление напоминания
    delete: (carId: string, id: string) => {
        console.log('📤 DELETE /api/details/notice/', carId, id);
        return api.delete(`/api/details/notice/${carId}/${id}`).then(() => null);
    },

    // Получение всех напоминаний для автомобиля
    getByCar: (carId: string) => {
        console.log('📤 GET /api/details/', carId);
        return api.get<Reminder[]>(`/api/details/${carId}`).then(r => r.data);
    },
    };