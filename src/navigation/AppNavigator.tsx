    // src/navigation/AppNavigator.tsx
    import React from 'react';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { useWindowDimensions } from 'react-native';

    // Import main screens
    import Dashboard from '../screens/Main/Dashboard';
    import Garage from '../screens/Main/Garage';
    import History from '../screens/Main/History';
    import Settings from '../screens/Main/Settings';

    // Import components
    import HybridTabIcon from '../components/HybridTabIcon';

    const Tab = createBottomTabNavigator();

    // Создаем обертку для HybridTabIcon
    const TabBarIconWrapper = (props: any) => {
    const { route, focused, color, size } = props;
    
    // Определяем тип иконки и label для каждого route
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
        default:
        iconType = 'home';
        label = 'Главная';
    }

    return (
        <HybridTabIcon
        focused={focused}
        label={label}
        iconType={iconType}
        size={size}
        />
    );
    };

    export default function AppNavigator() {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 375;

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: (props) => (
            <TabBarIconWrapper 
                route={route}
                {...props}
            />
            ),
            tabBarShowLabel: false,
            tabBarStyle: {
            height: isSmallScreen ? 70 : 80,
            paddingHorizontal: 8,
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            },
        })}
        >
        <Tab.Screen 
            name="Dashboard" 
            component={Dashboard}
        />
        <Tab.Screen 
            name="Garage" 
            component={Garage}
        />
        <Tab.Screen 
            name="History" 
            component={History}
        />
        <Tab.Screen 
            name="Settings" 
            component={Settings}
        />
        </Tab.Navigator>
    );
    }