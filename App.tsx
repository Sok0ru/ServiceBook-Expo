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
import Filters from './src/screens/Main/Filters';
import Reminders from './src/screens/Main/Reminders';
import CarDetails from './src/screens/Main/CarDetails';


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
            <Stack.Screen name="Filters" component={Filters} />
            <Stack.Screen name="Reminders" component={Reminders} /> 
            <Stack.Screen name="CarDetails" component={CarDetails} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }