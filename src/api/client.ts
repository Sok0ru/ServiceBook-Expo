    // src/api/client.ts
    import axios from 'axios';
    import Constants from 'expo-constants';
    import { Platform } from 'react-native';
    import { getToken, setToken } from '../utils/tokenSync';

    const BASE_URL =
    Constants.manifest?.extra?.apiUrl ??
    (Platform.OS === 'web'
        ? 'http://servicebook.sashaprok.ru/api'
        : 'http://servicebook.sashaprok.ru/api');

    export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    });

    /* -------------  request  ------------- */
    api.interceptors.request.use(
    (config) => {
        const t = getToken();
        if (t) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${t}`,
        };
        }
        return config;
    },
    (err) => Promise.reject(err)
    );

    /* -------------  response: 401 → refresh  ------------- */
    api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const orig = err.config;
        if (err.response?.status === 401 && !orig._retry) {
        orig._retry = true;
        try {
            const { data } = await api.get<{ jwt: { accessToken: string; refreshToken: string } }>('/user/refresh');
            setToken(data.jwt.accessToken);
            return api(orig);
        } catch {
            setToken(null);
            return Promise.reject(err);
        }
        }
        return Promise.reject(err);
    }
    );