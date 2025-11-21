    // utils/tokenSync.ts
    import AsyncStorage from '@react-native-async-storage/async-storage';

    const TOKEN_KEY = 'auth_token';
    const REFRESH_TOKEN_KEY = 'refresh_token';

    // Кэш для токенов в памяти
    let tokenCache: string | null = null;
    let refreshTokenCache: string | null = null;

    // Инициализация при загрузке приложения
    export const initializeTokens = async (): Promise<void> => {
    try {
        const [token, refreshToken] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(REFRESH_TOKEN_KEY)
        ]);
        tokenCache = token;
        refreshTokenCache = refreshToken;
    } catch (error) {
        console.error('Error initializing tokens:', error);
    }
    };

    // Синхронные геттеры (работают с кэшем)
    export const getToken = (): string | null => {
    return tokenCache;
    };

    export const getRefreshToken = (): string | null => {
    return refreshTokenCache;
    };

    // Асинхронные сеттеры
    export const setToken = async (token: string | null): Promise<void> => {
    try {
        tokenCache = token;
        if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        } else {
        await AsyncStorage.removeItem(TOKEN_KEY);
        }
    } catch (error) {
        console.error('Error setting token:', error);
    }
    };

    export const setRefreshToken = async (token: string | null): Promise<void> => {
    try {
        refreshTokenCache = token;
        if (token) {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
        } else {
        await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        }
    } catch (error) {
        console.error('Error setting refresh token:', error);
    }
    };

    export const clearTokens = async (): Promise<void> => {
    try {
        tokenCache = null;
        refreshTokenCache = null;
        await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
    } catch (error) {
        console.error('Error clearing tokens:', error);
    }
    };