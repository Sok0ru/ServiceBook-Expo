    import React, { useEffect, useState } from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import * as SecureStore from 'expo-secure-store';
    import { ActivityIndicator, View } from 'react-native';
    import { RootStackParamList } from '../types/navigation';

    // Экраны
    import EmailLoginScreen from '../screens/Auth/EmailLoginScreen';
    import EmailVerificationScreen from '../screens/Auth/EmailVerificationScreen';
    import LoginScreen from '../screens/Auth/LoginScreen';
    import Registration from '../screens/Auth/Registration';
    import AppNavigator from './AppNavigator';

    const Stack = createStackNavigator<RootStackParamList>();

    export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
        const token = await SecureStore.getItemAsync('access');
        setIsAuthenticated(!!token);   // ← просто проверили наличие
        setIsLoading(false);
        })();
    }, []);

    if (isLoading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        </View>
    );

    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
            <Stack.Screen name="MainTabs" component={AppNavigator} />
            ) : (
            <>
                <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
                <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={Registration} />
            </>
            )}
        </Stack.Navigator>
        </NavigationContainer>
    );
    }