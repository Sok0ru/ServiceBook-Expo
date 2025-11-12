  // App.tsx
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StatusBar } from 'expo-status-bar';
  import { ThemeProvider } from './src/contexts/ThemeContext';

  // Import auth screens
  import EmailLogin from './src/screens/Auth/LoginScreen';
  import EmailVerification from './src/screens/Auth/EmailVerification';
  import Login from './src/screens/Auth/Login';
  import Registration from './src/screens/Auth/Registration';

  // Import main screens
  import CarDetails from './src/screens/Main/CarDetails';
  import Reminders from './src/screens/Main/Reminders';
  import Filters from './src/screens/Main/Filters';
  import CreateReminder from './src/screens/Main/CreateReminder';
  import History from './src/screens/Main/History';

  // Import garage screens
  import AddCar from './src/screens/Garage/AddCar';
  import CarModels from './src/screens/Garage/CarModels';
  import CarGeneration from './src/screens/Garage/CarGeneration';
  import CarDetailsForm from './src/screens/Garage/CarDetailsForm';

  // Import main navigator
  import AppNavigator from './src/navigation/AppNavigator';

  // Import types
  import { RootStackParamList } from './src/types/navigation';

  const Stack = createNativeStackNavigator<RootStackParamList>();

  export default function App() {
    return (
      <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="EmailLogin"
          screenOptions={{
            headerShown: false
          }}
        >
          {/* Auth Screens - весь flow авторизации */}
          <Stack.Screen 
            name="EmailLogin" 
            component={EmailLogin}
          />
          <Stack.Screen 
            name="EmailVerification" 
            component={EmailVerification}
          />
          <Stack.Screen 
            name="Login" 
            component={Login}
          />
          <Stack.Screen 
            name="Registration" 
            component={Registration}
          />
          
          {/* Main App после авторизации */}
          <Stack.Screen 
            name="MainTabs" 
            component={AppNavigator}
          />

          {/* Individual Screens - доступные из табов */}
          <Stack.Screen 
            name="CarDetails" 
            component={CarDetails}
            options={{ 
              headerShown: true,
              title: 'Детали автомобиля'
            }}
          />
          <Stack.Screen 
            name="AddCar" 
            component={AddCar}
            options={{ 
              headerShown: true,
              title: 'Добавить автомобиль'
            }}
          />
          <Stack.Screen 
            name="History" 
            component={History}
            options={{ 
              headerShown: true,
              title: 'История'
            }}
          />
          <Stack.Screen 
            name="Reminders" 
            component={Reminders}
            options={{ 
              headerShown: true,
              title: 'Напоминания'
            }}
          />
          <Stack.Screen 
            name="Filters" 
            component={Filters}
            options={{ 
              headerShown: true,
              title: 'Фильтры'
            }}
          />
          <Stack.Screen 
            name="CreateReminder" 
            component={CreateReminder}
            options={{ 
              headerShown: true,
              title: 'Создать напоминание'
            }}
          />
          <Stack.Screen 
            name="CarModels" 
            component={CarModels}
            options={{ 
              headerShown: true,
              title: 'Выбор модели'
            }}
          />
          <Stack.Screen 
            name="CarGeneration" 
            component={CarGeneration}
            options={{ 
              headerShown: true,
              title: 'Выбор поколения'
            }}
          />
          <Stack.Screen 
            name="CarDetailsForm" 
            component={CarDetailsForm}
            options={{ 
              headerShown: true,
              title: 'Детали автомобиля'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
    );
  }