    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { Dimensions } from 'react-native';
    import Dashboard from '../screens/Main/Dashboard';
    import Garage from '../screens/Main/Garage';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';
    import HybridTabIcon from '../components/HybridTabIcon';

    const Tab = createBottomTabNavigator();
    const { width: screenWidth } = Dimensions.get('window');

    export default function AppNavigator() {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 8,
            borderRadius: 16,
            marginHorizontal: 0,
            marginBottom: 0,
            width: screenWidth,
            },
            tabBarItemStyle: {
            paddingVertical: 6,
            paddingHorizontal: 2,
                  width: screenWidth  / 4 + 10,
            },
        }}
        >
        <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
            tabBarIcon: ({ focused }) => (
                <HybridTabIcon 
                focused={focused}
                label="Главная"
                iconType="home" 
                size={24}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Garage"
            component={Garage}
            options={{
            tabBarIcon: ({ focused }) => (
                <HybridTabIcon 
                focused={focused}
                label="Гараж"
                iconType="garage"
                size={24}
                />
            ),
            }}
        />
        <Tab.Screen
            name="History"
            component={History}
            options={{
            tabBarIcon: ({ focused }) => (
                <HybridTabIcon 
                focused={focused}
                label="История"
                iconType="history" 
                size={24}
                />
            ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
            tabBarIcon: ({ focused }) => (
                <HybridTabIcon 
                focused={focused}
                label="Настройки"
                iconType="settings" 
                size={24}
                />
            ),
            }}
        />
        </Tab.Navigator>
    );
    }