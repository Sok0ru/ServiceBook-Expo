    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { Dimensions, StyleSheet } from 'react-native';
    import Dashboard from '../screens/Main/Dashboard';
    import Garage from '../screens/Main/Garage';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';
    import HybridTabIcon from '../components/HybridTabIcon';

    const Tab = createBottomTabNavigator();

    const { width } = Dimensions.get('window');
    const isSmallDevice = width < 375;
    const isTablet = width >= 768;

    const getIconSize = () => (isSmallDevice ? 20 : isTablet ? 28 : 24);
    const getTabBarHeight = () => (isSmallDevice ? 70 : isTablet ? 95 : 80);
    const getTabBarPadding = () => (isSmallDevice ? 4 : isTablet ? 12 : 8);

    const TabBarIconWrapper = ({ route, focused }: any) => {
    let iconType: 'home' | 'garage' | 'history' | 'settings' = 'home';
    let label = '';

    switch (route.name) {
        case 'Dashboard': iconType = 'home'; label = 'Главная'; break;
        case 'Garage': iconType = 'garage'; label = 'Гараж'; break;
        case 'History': iconType = 'history'; label = 'История'; break;
        case 'Settings': iconType = 'settings'; label = 'Настройки'; break;
    }

    return <HybridTabIcon focused={focused} label={label} iconType={iconType} size={getIconSize()} />;
    };

    export default function AppNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: (props) => <TabBarIconWrapper route={route} {...props} />,
            tabBarShowLabel: false,
            tabBarStyle: {
            height: getTabBarHeight(),
            paddingHorizontal: getTabBarPadding(),
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            },
        })}
        >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Garage" component={Garage} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
    }