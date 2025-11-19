
    import React from 'react';
    import { createStackNavigator } from '@react-navigation/stack';
    import AddCar from '../screens/Garage/AddCar';
    import CarModels from '../screens/Garage/CarModels';
    import CarGeneration from '../screens/Garage/CarGeneration';
    import CarDetailsForm from '../screens/Garage/CarDetailsForm';
    import SelectCarForReminder from '../screens/Main/SelectCarForReminder';

    export type AddCarStackParamList = {
    AddCar: undefined;
    CarModels: { brand: string };
    CarGeneration: { brand: string; model: string };
    CarDetailsForm: { brand: string; model: string; generation: string };
    SelectCarForReminder: undefined;
    };

    const Stack = createStackNavigator<AddCarStackParamList>();

    export default function AddCarStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AddCar" component={AddCar} />
        <Stack.Screen name="CarModels" component={CarModels} />
        <Stack.Screen name="CarGeneration" component={CarGeneration} />
        <Stack.Screen name="CarDetailsForm" component={CarDetailsForm} />
        <Stack.Screen name="SelectCarForReminder" component={SelectCarForReminder} />
        </Stack.Navigator>
    );
    }