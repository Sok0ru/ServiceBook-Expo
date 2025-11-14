    // src/api/client.ts
    import axios from 'axios';
    import * as SecureStore from 'expo-secure-store';
    import Constants from 'expo-constants';
    import { Platform } from 'react-native';

    const BASE_URL =
    Constants.manifest?.extra?.apiUrl ||          // ← первым читаем из .env
    (Platform.OS === 'web'                       // ← веб всегда на бэк
        ? 'http://servicebook.sashaprok.ru/api'
        : 'http://servicebook.sashaprok.ru/api')

    export let accessToken: string | null = null;   // 1. глобальная переменная

    /* ------ 2. однократно читаем токен при запуске ------ */
    SecureStore.getItemAsync('access').then(t => { accessToken = t; });

    export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    });

    /* ------ 3. синхронный request-интерцептор ------ */
    api.interceptors.request.use(
    (config) => {
        if (accessToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };
        }
        return config;
    },
    (err) => Promise.reject(err)
    );

    /* ------ 4. response: 401 → refresh ------ */
    api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const orig = err.config;
        if (err.response?.status === 401 && !orig._retry) {
        orig._retry = true;
        try {
            const { data } = await api.get<{ jwt: { accessToken: string; refreshToken: string } }>('/user/refresh');
            accessToken = data.jwt.accessToken;                 // обновляем переменную
            await SecureStore.setItemAsync('access', accessToken);
            return api(orig);                                   // повторяем запрос
        } catch {
            accessToken = null;
            await SecureStore.deleteItemAsync('access');
            return Promise.reject(err);
        }
        }
        return Promise.reject(err);
    }
    );