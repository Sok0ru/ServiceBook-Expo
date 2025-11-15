    import * as SecureStore from 'expo-secure-store';

    let tokenCache: string | null = null;

    // читаем 1 раз при старте
    SecureStore.getItemAsync('access').then(t => { tokenCache = t; });

    export const getToken = () => tokenCache;
    export const setToken = (t: string | null) => {
    tokenCache = t;
    return t ? SecureStore.setItemAsync('access', t) : SecureStore.deleteItemAsync('access');
    };