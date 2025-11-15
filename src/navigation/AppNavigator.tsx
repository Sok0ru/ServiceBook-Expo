    // src/navigation/AppNavigator.tsx
    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { createStackNavigator } from '@react-navigation/stack';
    import { Dimensions } from 'react-native';
    import Dashboard from '../screens/Main/Dashboard';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';
    import Garage from '../screens/Main/Garage';
    import AddCarStackNavigator from './AddCarStackNavigator';
    import HybridTabIcon from '../components/HybridTabIcon';
    import { MainTabParamList } from '../types/navigation';

    const Tab = createBottomTabNavigator<MainTabParamList>();
    const Stack = createStackNavigator<MainTabParamList>();

    function MainTabBar() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => (
            <HybridTabIcon
                focused={focused}
                label={route.name}
                iconType={
                route.name === 'Dashboard' ? 'home' :
                route.name === 'Garage'   ? 'garage' :
                route.name === 'History'  ? 'history' : 'settings'
                }
                size={size}
            />
            ),
        })}
        >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Garage" component={Garage} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
    }

    export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabBar" component={MainTabBar} />
        <Stack.Screen name="AddCarStack" component={AddCarStackNavigator} />
        </Stack.Navigator>
    );
    }