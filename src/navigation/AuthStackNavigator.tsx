    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
    import EmailLoginScreen from '../screens/Auth/EmailLoginScreen';
    import EmailVerificationScreen from '../screens/Auth/EmailVerificationScreen';
    import LoginScreen from '../screens/Auth/LoginScreen';

    export type AuthStackParamList = {
    EmailLogin: undefined;
    EmailVerification: { email: string; password?: string };
    Login: undefined;
    };

    const Stack = createStackNavigator<AuthStackParamList>();

    export default function AuthStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
    }