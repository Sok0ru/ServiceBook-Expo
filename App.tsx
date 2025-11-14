  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StatusBar } from 'expo-status-bar';
  import { ThemeProvider } from './src/contexts/ThemeContext';
  import { RootStackParamList } from './src/types/navigation';

  // Auth
  import EmailLoginScreen from './src/screens/Auth/EmailLoginScreen';
  import EmailVerificationScreen from './src/screens/Auth/EmailVerificationScreen';
  import LoginScreen from './src/screens/Auth/LoginScreen';
  import Registration from './src/screens/Auth/Registration';

  // Main
  import AppNavigator from './src/navigation/AppNavigator';

  const Stack = createNativeStackNavigator<RootStackParamList>();

  export default function App() {
    return (
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="EmailLogin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
            <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="MainTabs" component={AppNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }