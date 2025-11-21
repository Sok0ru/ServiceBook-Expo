    import axios from 'axios';
    import Constants from 'expo-constants';
    import { Platform } from 'react-native';
    import { getToken, setToken, getRefreshToken, setRefreshToken, clearTokens } from '../utils/tokenSync';
    import { authAPI } from './auth';

    let isRefreshing = false;        // крутится ли обмен
    let failedQueue: Array<{
    resolve: (token?: string | null) => void;
    reject: (error?: any) => void;
    }> = [];

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

    const processFailedQueue = (token: string | null, error?: any) => {
    failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
    failedQueue = [];
    };

    /* -------------  response: 401 → refresh  ------------- */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const orig = err.config;

    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true;

      // если уже обмениваем – просто ставим в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          orig.headers.Authorization = `Bearer ${token}`;
          return api(orig);
        }).catch((e) => Promise.reject(e));
      }

      isRefreshing = true;               
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;          
        await clearTokens();
        return Promise.reject(err);
      }

      try {
        const { jwt } = await authAPI.refreshTokens(refreshToken);
        await setToken(jwt.accessToken);
        await setRefreshToken(jwt.refreshToken);

        processFailedQueue(jwt.accessToken, undefined);   // пускаем очередь
        orig.headers.Authorization = `Bearer ${jwt.accessToken}`;
        return api(orig);
      } catch (refreshErr: any) {
        // 401 от refresh = refresh тоже протух – выходим
        if (refreshErr.response?.status === 401) {
          await clearTokens();
          processFailedQueue(null, refreshErr);
          return Promise.reject(refreshErr);
        }
        // сетевая ошибка – не трогаем токены, просто реджектим
        processFailedQueue(null, refreshErr);
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

