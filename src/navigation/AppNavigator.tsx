
    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import Dashboard from '../screens/Main/Dashboard';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';
    import Garage from '../screens/Main/Garage'; 

    import HybridTabIcon from '../components/HybridTabIcon';
    import { MainTabParamList } from '../types/navigation';

    const Tab = createBottomTabNavigator<MainTabParamList>();

    export default function AppNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
            <HybridTabIcon
                focused={focused}
                label={route.name}
                iconType={
                route.name === 'Dashboard' ? 'home' :
                route.name === 'Garage' ? 'garage' :
                route.name === 'History' ? 'history' : 'settings'
                }
                size={size}
            />
            ),
            tabBarShowLabel: false,
        })}
        >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Garage" component={Garage} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
    }