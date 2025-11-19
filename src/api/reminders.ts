    import { api } from './client';

    export interface Reminder {
    id: string;
    name: string; 
    tag: string;
    noticeType: 'mileage' | 'date';
    mileageNotice?: number; 
    dateNotice?: number;      
    enabled: boolean;
    carId: string;
    }

    export interface CreateReminderData {
    name: string;
    tag: string;
    noticeType: 'mileage' | 'date';
    mileageNotice?: number;
    dateNotice?: number;
    enabled: boolean;
    }

    export const remindersAPI = {
    create: (carId: string, data: CreateReminderData) =>
        api.post<Reminder>(`/details/${carId}`, data).then(r => r.data),

    update: (carId: string, id: string, data: Partial<Reminder>) =>
        api.patch<Reminder>(`/details/${carId}/${id}`, data).then(r => r.data),

    updateNotice: (carId: string, id: string, noticeDate: number) =>
        api.post<Reminder>(`/details/notice/${carId}/${id}`, { noticeDate }).then(r => r.data),

    delete: (carId: string, id: string) =>
        api.delete(`/details/notice/${carId}/${id}`).then(() => null),

    getByCar: (carId: string) =>
        api.get<Reminder[]>(`/details/${carId}`).then(r => r.data),
    };