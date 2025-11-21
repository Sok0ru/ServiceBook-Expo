    import axios from 'axios';
    import Constants from 'expo-constants';
    import { Platform } from 'react-native';
    import { getToken, setToken, getRefreshToken, setRefreshToken, clearTokens } from '../utils/tokenSync';
import { authAPI } from './auth';

    const BASE_URL =
    Constants.extra?.apiUrl ??
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
    res => res,
    async err => {
        const orig = err.config;

        if (err.response?.status === 401 && !orig._retry) {
        orig._retry = true;

        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            await clearTokens();          // чистим и уходим
            return Promise.reject(err);
        }

        try {
            // 1. Запрашиваем новую пару токенов refresh-токеном в теле
            const { jwt } = await authAPI.refreshTokens(refreshToken);

            // 2. Сохраняем их
            await setToken(jwt.accessToken);
            await setRefreshToken(jwt.refreshToken);

            // 3. Подменяем заголовок и повторяем оригинальный запрос
            orig.headers.Authorization = `Bearer ${jwt.accessToken}`;
            return api(orig);
        } catch (refreshErr) {
            // refresh тоже протух – выкидываем пользователя
            await clearTokens();
            return Promise.reject(refreshErr);
        }
        }
        return Promise.reject(err);
    }
    );