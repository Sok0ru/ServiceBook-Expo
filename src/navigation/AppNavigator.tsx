    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import Dashboard from '../screens/Main/Dashboard';
    import Garage from '../screens/Main/Garage';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';
    import TabBarIcon from '../components/TabBarIcon';

    const Tab = createBottomTabNavigator();

    export default function AppNavigator() {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            height: 80,
            paddingBottom: 16,
            paddingTop: 8,
            },
        }}
        >
        <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} title="Главная" />
            ),
            }}
        />
        <Tab.Screen
            name="Garage"
            component={Garage}
            options={{
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} title="Гараж" />
            ),
            }}
        />
        <Tab.Screen
            name="History"
            component={History}
            options={{
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} title="История" />
            ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} title="Настройки" />
            ),
            }}
        />
        </Tab.Navigator>
    );
    }