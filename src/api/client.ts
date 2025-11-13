    import axios from 'axios';
    import * as SecureStore from 'expo-secure-store';
    import Constants from 'expo-constants';

    const BASE_URL =
    Constants.manifest?.extra?.apiUrl ||
    (typeof location !== 'undefined' && location.origin + '/api') ||
    'http://servicebook.sashaprok.ru/api';

    export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    });

    api.interceptors.request.use(
    (config) => {
        const t = SecureStore.getItemAsync('access'); 
        if (t) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${t}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
    );

    // 2. response: 401 → refresh
    api.interceptors.response.use(
    (res) => res,
    (err) => {
        const orig = err.config;
        if (err.response?.status === 401 && !orig._retry) {
        orig._retry = true;
        return api.get('/user/refresh')
            .then(({ data }) => {
            const jwt = (data as any).jwt;
            SecureStore.setItemAsync('access', jwt.accessToken);
            return api(orig);
            })
            .catch(() => {
            SecureStore.deleteItemAsync('access');
            return Promise.reject(err);
            });
        }
        return Promise.reject(err);
    }
    );