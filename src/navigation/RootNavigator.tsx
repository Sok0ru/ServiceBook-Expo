    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import { useAuth } from '../hooks/useAuth';
    import AuthStackNavigator from './AuthStackNavigator';
    import AppNavigator from './AppNavigator';
    import { ActivityIndicator, View } from 'react-native';

    export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    };

    const Stack = createStackNavigator<RootStackParamList>();

    export default function RootNavigator() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        </View>
    );

    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
            <Stack.Screen name="Main" component={AppNavigator} />
            ) : (
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
            )}
        </Stack.Navigator>
        </NavigationContainer>
    );
    }