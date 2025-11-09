    // src/components/HybridTabIcon.tsx
    import React from 'react';
    import { Animated, View, StyleSheet } from 'react-native';
    import Svg, { Path } from 'react-native-svg';
    import { Ionicons } from '@expo/vector-icons';
    import { useAdaptiveStyles } from '../hooks/useAdaptiveStyles';

    // Кастомная иконка только для Главной из Pixso
    const CustomHomeIcon = {
        active: "M 21 19.3939 C 21 19.6511 20.8946 19.8978 20.7071 20.0796 C 20.5196 20.2614 20.2652 20.3636 20 20.3636 L 4 20.3636 C 3.73478 20.3636 3.48043 20.2614 3.29289 20.0796 C 3.10536 19.8978 3 19.6511 3 19.3939 L 3 9.20243 C 2.99989 9.05466 3.03462 8.90882 3.10152 8.77605 C 3.16841 8.64328 3.26572 8.5271 3.386 8.43637 L 11.386 2.40291 C 11.5615 2.2705 11.7776 2.19861 12 2.19861 C 12.2224 2.19861 12.4385 2.2705 12.614 2.40291 L 20.614 8.43637 C 20.7343 8.5271 20.8316 8.64328 20.8985 8.77605 C 20.9654 8.90882 21.0001 9.05466 21 9.20243 L 21 19.3939 L 21 19.3939 Z M 19 18.4242 L 19 9.67564 L 12 4.39661 L 5 9.67564 L 5 18.4242 L 19 18.4242 Z",
        inactive: "M 21 19.3939 C 21 19.6511 20.8946 19.8978 20.7071 20.0796 C 20.5196 20.2614 20.2652 20.3636 20 20.3636 L 4 20.3636 C 3.73478 20.3636 3.48043 20.2614 3.29289 20.0796 C 3.10536 19.8978 3 19.6511 3 19.3939 L 3 9.20243 C 2.99989 9.05466 3.03462 8.90882 3.10152 8.77605 C 3.16841 8.64328 3.26572 8.5271 3.386 8.43637 L 11.386 2.40291 C 11.5615 2.2705 11.7776 2.19861 12 2.19861 C 12.2224 2.19861 12.4385 2.2705 12.614 2.40291 L 20.614 8.43637 C 20.7343 8.5271 20.8316 8.64328 20.8985 8.77605 C 20.9654 8.90882 21.0001 9.05466 21 9.20243 L 21 19.3939 L 21 19.3939 Z M 19 18.4242 L 19 9.67564 L 12 4.39661 L 5 9.67564 L 5 18.4242 L 19 18.4242 Z"
    };

    // Ionicons для остальных вкладок
    const IoniconsIcons = {
        garage: {
            active: 'car-sport' as const,
            inactive: 'car-sport-outline' as const
        },
        history: {
            active: 'time' as const,
            inactive: 'time-outline' as const
        },
        settings: {
            active: 'settings' as const,
            inactive: 'settings-outline' as const
        }
    };

    type HybridTabIconProps = {
        focused: boolean;
        label: string;
        iconType: 'home' | 'garage' | 'history' | 'settings';
        size?: number;
    };

    const HybridTabIcon: React.FC<HybridTabIconProps> = ({ 
        focused, 
        label, 
        iconType, 
        size = 24 
    }) => {
        const scale = React.useRef(new Animated.Value(1)).current;
        const { 
            adaptiveValues, 
            isSmallDevice, 
            isTablet, 
            width 
        } = useAdaptiveStyles();

        // Адаптивное количество табов и ширина
        const TAB_COUNT = 4;
        const TAB_WIDTH = (width - adaptiveValues.spacing.md * 2) / TAB_COUNT;

        //  размер иконки
        const getIconSize = () => {
            if (isSmallDevice) return size * 0.8;
            if (isTablet) return size * 1.2;
            return size;
        };

        //  размер шрифта 
        const getLabelFontSize = () => {
            if (isSmallDevice) return 8;
            if (isTablet) return 11;
            return 10;
        };

        //  отступ сверху для иконки 
        const getIconMarginTop = () => {
            if (isSmallDevice) return 8;  
            if (isTablet) return 12;      
            return 10;                    
        };

        //  отступ сверху 
        const getLabelMarginTop = () => {
            if (isSmallDevice) return 4;  
            if (isTablet) return 6;       
            return 5;                     
        };

        //  высота контейнера 
        const getContainerHeight = () => {
            if (isSmallDevice) return 60;  
            if (isTablet) return 85;       
            return 70;                     
        };

        //  отступ снизу для всего контейнера
        const getContainerPaddingBottom = () => {
            if (isSmallDevice) return 8;   
            if (isTablet) return 12;       
            return 10;                     
        };

        React.useEffect(() => {
            if (focused) {
                Animated.spring(scale, {
                    toValue: 1.1,
                    useNativeDriver: true,
                    tension: 150,
                    friction: 8,
                }).start();
            } else {
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 150,
                    friction: 8,
                }).start();
            }
        }, [focused, scale]);

        const iconColor = focused ? '#007AFF' : '#666';
        const iconSize = getIconSize();
        const labelFontSize = getLabelFontSize();
        const iconMarginTop = getIconMarginTop();
        const labelMarginTop = getLabelMarginTop();
        const containerHeight = getContainerHeight();
        const containerPaddingBottom = getContainerPaddingBottom();

        const renderIcon = () => {
            if (iconType === 'home') {
                return (
                    <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
                        <Path 
                            d={focused ? CustomHomeIcon.active : CustomHomeIcon.inactive} 
                            fill={iconColor}
                            stroke={iconColor}
                            strokeWidth={focused ? 1.5 : 1}
                        />
                    </Svg>
                );
            } else {
                const iconConfig = IoniconsIcons[iconType];
                const iconName = focused ? iconConfig.active : iconConfig.inactive;
                return (
                    <Ionicons 
                        name={iconName} 
                        size={iconSize} 
                        color={iconColor} 
                    />
                );
            }
        };

        return (
            <View style={[
                styles.container, 
                { 
                    width: TAB_WIDTH,
                    height: containerHeight,
                    paddingHorizontal: adaptiveValues.spacing.xs,
                    paddingBottom: containerPaddingBottom,
                }
            ]}>
                <Animated.View style={[
                    styles.iconContainer,
                    { 
                        transform: [{ scale }],
                        marginTop: iconMarginTop,
                    }
                ]}>
                    {renderIcon()}
                </Animated.View>
                <Animated.Text 
                    style={[
                        styles.label,
                        { 
                            fontSize: labelFontSize,
                            marginTop: labelMarginTop,
                            lineHeight: labelFontSize * 1.2,
                        },
                        focused && styles.labelFocused,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    allowFontScaling={false}
                >
                    {label}
                </Animated.Text>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'flex-start', 
        },
        iconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            color: '#666',
            fontWeight: '500',
            textAlign: 'center',
            includeFontPadding: false,
        },
        labelFocused: {
            color: '#007AFF',
            fontWeight: '600',
        },
    });

    export default HybridTabIcon;