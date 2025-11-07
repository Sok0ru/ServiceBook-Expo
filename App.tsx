  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StatusBar } from 'expo-status-bar';

  // Import screens
  import EmailVerification from './src/screens/Auth/EmailVerification';
  import Login from './src/screens/Auth/Login';
  import Registration from './src/screens/Auth/Registration';

  // Import main screens
  import Dashboard from './src/screens/Main/Dashboard';
  import CarDetails from './src/screens/Main/CarDetails';
  import Reminders from './src/screens/Main/Reminders';
  import Filters from './src/screens/Main/Filters';
  import CreateReminder from './src/screens/Main/CreateReminder';

  // Import garage screens
  import Garage from './src/screens/Main/Garage';
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
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="EmailVerification">
          {/* Auth Screens */}
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
          
          {/* Main Tabs */}
          <Stack.Screen 
            name="MainTabs" 
            component={AppNavigator}
            options={{ headerShown: false }}
          />
          
          {/* Main Screens */}
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen 
            name="CreateReminder" 
            component={CreateReminder}
            options={{ title: 'Создать напоминание' }}
          />
          
          {/* Garage Screens */}
          <Stack.Screen 
            name="Garage" 
            component={Garage}
            options={{ title: 'Гараж' }}
          />
          <Stack.Screen 
            name="AddCar" 
            component={AddCar}
            options={{ title: 'Добавить автомобиль' }}
          />
          <Stack.Screen 
            name="CarModels" 
            component={CarModels}
            options={{ title: 'Выбор модели' }}
          />
          <Stack.Screen 
            name="CarGeneration" 
            component={CarGeneration}
            options={{ title: 'Выбор поколения' }}
          />
          <Stack.Screen 
            name="CarDetailsForm" 
            component={CarDetailsForm}
            options={{ title: 'Детали автомобиля' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }