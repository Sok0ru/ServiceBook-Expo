    import { useEffect, useState } from 'react';
    import * as SecureStore from 'expo-secure-store';
    import { authAPI } from '../api/auth';

    export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
        const token = await SecureStore.getItemAsync('access');
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }
        try {
            await authAPI.refresh(); // проверим жив ли refresh
            setIsAuthenticated(true);
        } catch {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
        })();
    }, []);

    return { isLoading, isAuthenticated };
    };