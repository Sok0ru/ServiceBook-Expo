import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'access_token';

export const getAccessToken = () => SecureStore.getItemAsync(ACCESS_KEY);
export const setAccessToken = (token: string) => SecureStore.setItemAsync(ACCESS_KEY, token);
export const clearTokens = () => SecureStore.deleteItemAsync(ACCESS_KEY);