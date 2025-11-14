    import { api } from './client';
    import { Car, Brand } from '../types/navigation';

    export const carsAPI = {
    list: () => api.get<Car[]>('/cars').then((r) => r.data),
    add: (car: Omit<Car, 'id'>) => api.post<Car>('/cars', car).then((r) => r.data),
    update: (id: string, car: Partial<Car>) => api.patch<Car>(`/cars/${id}`, car).then((r) => r.data),
    delete: (id: string) => api.delete<void>(`/cars/${id}`).then(() => null),
    brands: () => api.get<Brand[]>('/cars/brands').then((r) => r.data),
    };