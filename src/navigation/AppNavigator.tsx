    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { Dimensions } from 'react-native';
    import Dashboard from '../screens/Main/Dashboard';
    import Garage from '../screens/Main/Garage';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';
    import HybridTabIcon from '../components/HybridTabIcon';
    import { wp, hp, isTablet } from '../utils/responsive';

    const Tab = createBottomTabNavigator();
    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    export default function AppNavigator() {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            height: isTablet ? hp(12) : hp(10), 
            paddingBottom: isTablet ? hp(3) : hp(2),
            paddingTop: isTablet ? hp(2) : hp(1.5),
            position: 'absolute',
            //borderRadius: isTablet ? wp(6) : wp(4),
            marginHorizontal: isTablet ? wp(3) : wp(2.5),
            //marginBottom: isTablet ? hp(2) : hp(1.5),
            width: SCREEN_WIDTH - (isTablet ? wp(6) : wp(5)),
            },
            tabBarItemStyle: {
            paddingVertical: isTablet ? hp(1) : hp(0.5),
            paddingHorizontal: wp(0.5),
            width: (SCREEN_WIDTH - (isTablet ? wp(6) : wp(5))) / 4,
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
                size={isTablet ? wp(6) : wp(5.5)}
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
                size={isTablet ? wp(6) : wp(5.5)}
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
                size={isTablet ? wp(6) : wp(5.5)}
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
                size={isTablet ? wp(6) : wp(5.5)}
                />
            ),
            }}
        />
        </Tab.Navigator>
    );
    }