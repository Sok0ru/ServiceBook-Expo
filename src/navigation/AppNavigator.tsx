    // src/navigation/AppNavigator.tsx
    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { Dimensions } from 'react-native';
    import { useAdaptiveStyles } from '../hooks/useAdaptiveStyles';

    import Dashboard from '../screens/Main/Dashboard';
    import Garage from '../screens/Main/Garage';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';

    import HybridTabIcon from '../components/HybridTabIcon';

    const Tab = createBottomTabNavigator();

    // ← ВЫНЕСИ ВНЕ КОМПОНЕНТА
    const { width } = Dimensions.get('window');
    const isSmallDevice = width < 375;
    const isTablet = width >= 768;

    // фиксированные значения
    const getIconSize = () => {
    if (isSmallDevice) return 20;
    if (isTablet) return 28;
    return 24;
    };

    const getTabBarHeight = () => {
    if (isSmallDevice) return 70;
    if (isTablet) return 95;
    return 80;
    };

    const getTabBarPadding = () => {
    if (isSmallDevice) return 4;
    if (isTablet) return 12;
    return 8;
    };

    // обертка без useWindowDimensions
    const TabBarIconWrapper = (props: any) => {
    const { route, focused } = props;

    let iconType: 'home' | 'garage' | 'history' | 'settings' = 'home';
    let label = '';

    switch (route.name) {
        case 'Dashboard':
        iconType = 'home';
        label = 'Главная';
        break;
        case 'Garage':
        iconType = 'garage';
        label = 'Гараж';
        break;
        case 'History':
        iconType = 'history';
        label = 'История';
        break;
        case 'Settings':
        iconType = 'settings';
        label = 'Настройки';
        break;
    }

    return (
        <HybridTabIcon
        focused={focused}
        label={label}
        iconType={iconType}
        size={getIconSize()}
        />
    );
    };

    export default function AppNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: (props) => (
            <TabBarIconWrapper route={route} {...props} />
            ),
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