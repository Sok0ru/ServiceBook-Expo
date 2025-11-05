  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StatusBar } from 'expo-status-bar';

  // Импорт экранов авторизации
  import EmailVerification from './src/screens/Auth/EmailVerification';
  import Login from './src/screens/Auth/Login';
  import Registration from './src/screens/Auth/Registration';

  // Импорт основных экранов (которые будут в стеке)
  import CarDetails from './src/screens/Main/CarDetails';
  import Reminders from './src/screens/Main/Reminders';
  import Filters from './src/screens/Main/Filters';

  // Импорт главного навигатора с табами
  import AppNavigator from './src/navigation/AppNavigator';

  const Stack = createNativeStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="EmailVerification">
          {/* Экраны авторизации */}
          <Stack.Screen 
            name="EmailVerification" 
            component={EmailVerification}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Registration" 
            component={Registration}
            options={{ headerShown: false }}
          />
          
          {/* Главный таб-навигатор */}
          <Stack.Screen 
            name="MainTabs" 
            component={AppNavigator}
            options={{ headerShown: false }}
          />
          
          {/* Экраны, которые открываются поверх табов */}
          <Stack.Screen 
            name="CarDetails" 
            component={CarDetails}
            options={{ title: 'Детали автомобиля' }}
          />
          <Stack.Screen 
            name="Reminders" 
            component={Reminders}
            options={{ title: 'Напоминания' }}
          />
          <Stack.Screen 
            name="Filters" 
            component={Filters}
            options={{ title: 'Фильтры' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }