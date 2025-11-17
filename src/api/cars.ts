    import { api } from './client';
    import { Car, Brand } from '../types/navigation';

    export const carsAPI = {
        // GET /cars - получить список автомобилей
        list: () => {
            console.log('📤 GET запрос на: /cars');
            return api.get<{ cars: Car[] }>('/cars').then((r) => r.data.cars);
        },
        
        // POST /cars/create - создать автомобиль
        add: (car: Omit<Car, 'id'>) => {
            console.log('📤 POST запрос на: /cars', car);
            return api.post<Car>('/cars', car).then((r) => r.data);
        },
        
        // PATCH /cars/:id - обновить автомобиль
        update: (id: string, car: Partial<Car>) => {
            console.log('📤 PATCH запрос на:', `/cars/${id}`, car);
            return api.patch<Car>(`/cars/${id}`, car).then((r) => r.data);
        },
        
        // DELETE /cars/:id - удалить автомобиль
        delete: (id: string) => {
            const correctEndpoint = `/cars/${id}`; // ЗАМЕНИТЕ НА ПРАВИЛЬНЫЙ
            console.log('📤 DELETE запрос на:', correctEndpoint);
            return api.delete<void>(correctEndpoint).then(() => null);
        },
    };