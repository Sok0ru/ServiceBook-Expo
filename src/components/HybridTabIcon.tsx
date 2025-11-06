    import React from 'react';
    import { Animated, View, StyleSheet, Dimensions } from 'react-native';
    import Svg, { Path } from 'react-native-svg';
    import { Ionicons } from '@expo/vector-icons';

    const { width: screenWidth } = Dimensions.get('window');
    const TAB_WIDTH = (screenWidth - 8) / 4;

    // Кастомная иконка только для Главной из Pixso
    const CustomHomeIcon = {
    
        active: "M 21 19.3939 C 21 19.6511 20.8946 19.8978 20.7071 20.0796 C 20.5196 20.2614 20.2652 20.3636 20 20.3636 L 4 20.3636 C 3.73478 20.3636 3.48043 20.2614 3.29289 20.0796 C 3.10536 19.8978 3 19.6511 3 19.3939 L 3 9.20243 C 2.99989 9.05466 3.03462 8.90882 3.10152 8.77605 C 3.16841 8.64328 3.26572 8.5271 3.386 8.43637 L 11.386 2.40291 C 11.5615 2.2705 11.7776 2.19861 12 2.19861 C 12.2224 2.19861 12.4385 2.2705 12.614 2.40291 L 20.614 8.43637 C 20.7343 8.5271 20.8316 8.64328 20.8985 8.77605 C 20.9654 8.90882 21.0001 9.05466 21 9.20243 L 21 19.3939 L 21 19.3939 Z M 19 18.4242 L 19 9.67564 L 12 4.39661 L 5 9.67564 L 5 18.4242 L 19 18.4242 Z",
        inactive: "M 21 19.3939 C 21 19.6511 20.8946 19.8978 20.7071 20.0796 C 20.5196 20.2614 20.2652 20.3636 20 20.3636 L 4 20.3636 C 3.73478 20.3636 3.48043 20.2614 3.29289 20.0796 C 3.10536 19.8978 3 19.6511 3 19.3939 L 3 9.20243 C 2.99989 9.05466 3.03462 8.90882 3.10152 8.77605 C 3.16841 8.64328 3.26572 8.5271 3.386 8.43637 L 11.386 2.40291 C 11.5615 2.2705 11.7776 2.19861 12 2.19861 C 12.2224 2.19861 12.4385 2.2705 12.614 2.40291 L 20.614 8.43637 C 20.7343 8.5271 20.8316 8.64328 20.8985 8.77605 C 20.9654 8.90882 21.0001 9.05466 21 9.20243 L 21 19.3939 L 21 19.3939 Z M 19 18.4242 L 19 9.67564 L 12 4.39661 L 5 9.67564 L 5 18.4242 L 19 18.4242 Z"
    
    };

    // Ionicons для остальных вкладок
    const IoniconsIcons = {
    garage: {
        active: 'car-sport' as keyof typeof Ionicons.glyphMap,
        inactive: 'car-sport-outline' as keyof typeof Ionicons.glyphMap
    },
    history: {
        active: 'time' as keyof typeof Ionicons.glyphMap,
        inactive: 'time-outline' as keyof typeof Ionicons.glyphMap
    },
    settings: {
        active: 'settings' as keyof typeof Ionicons.glyphMap,
        inactive: 'settings-outline' as keyof typeof Ionicons.glyphMap
    }
    };

    type HybridTabIconProps = {
    focused: boolean;
    label: string;
    iconType: 'home' | 'garage' | 'history' | 'settings';
    size?: number;
    };

    export default function HybridTabIcon({ 
    focused, 
    label, 
    iconType, 
    size = 24 
    }: HybridTabIconProps) {
    const scale = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        if (focused) {
        Animated.spring(scale, {
            toValue: 1.1,
            useNativeDriver: true,
        }).start();
        } else {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        }
    }, [focused]);

    const iconColor = focused ? '#007AFF' : '#666';

    // Только Главная - кастомная иконка
    const isCustomIcon = iconType === 'home';

    return (
        <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale }] }}>
            {isCustomIcon ? (
            // Кастомная SVG иконка для Главной
            <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path 
                d={focused ? CustomHomeIcon.active : CustomHomeIcon.inactive} 
                fill={iconColor}
                stroke={iconColor}
                strokeWidth={focused ? 1.5 : 1}
                />
            </Svg>
            ) : (
            // Ionicons иконки для Гаража, Истории и Настроек
            <Ionicons 
                name={focused ? IoniconsIcons[iconType].active : IoniconsIcons[iconType].inactive} 
                size={size} 
                color={iconColor} 
            />
            )}
        </Animated.View>
        <Animated.Text 
            style={[
            styles.label,
            focused && styles.labelFocused,
            { transform: [{ scale }] }
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
        >
            {label}
        </Animated.Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: TAB_WIDTH,
        paddingHorizontal: 2,
        minHeight: 50,
    },
    label: {
        fontSize: 10,
        color: '#666',
        fontWeight: '500',
        marginTop: 3,
        textAlign: 'center',
        lineHeight: 11,
        includeFontPadding: false,
    },
    labelFocused: {
        color: '#007AFF',
        fontWeight: '600',
    },
    });