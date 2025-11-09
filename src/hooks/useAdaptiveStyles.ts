    // src/hooks/useAdaptiveStyles.ts
    import { useWindowDimensions, StyleSheet, Platform } from 'react-native';

    export const useAdaptiveStyles = () => {
    const { width, height } = useWindowDimensions();

    // Брейкпоинты для разных устройств
    const breakpoints = {
        small: 375,    // iPhone SE, маленькие Android
        medium: 414,   // iPhone 11 Pro, большинство Android
        large: 768,    // iPad mini, маленькие планшеты
        xlarge: 1024,  // iPad Pro, большие планшеты
    };

    // Определяем тип устройства
    const getDeviceType = () => {
        if (width < breakpoints.small) return 'phone-small';
        if (width < breakpoints.medium) return 'phone-normal';
        if (width < breakpoints.large) return 'phone-large';
        if (width < breakpoints.xlarge) return 'tablet-small';
        return 'tablet-large';
    };

    const deviceType = getDeviceType();

    // Адаптивные значения
    const adaptiveValues = {
        spacing: {
        xs: deviceType === 'phone-small' ? 4 : 6,
        sm: deviceType === 'phone-small' ? 8 : 12,
        md: deviceType === 'phone-small' ? 12 : 16,
        lg: deviceType === 'phone-small' ? 16 : 24,
        xl: deviceType === 'phone-small' ? 24 : 32,
        },
        fontSize: {
        xs: deviceType === 'phone-small' ? 10 : 12,
        sm: deviceType === 'phone-small' ? 12 : 14,
        md: deviceType === 'phone-small' ? 14 : 16,
        lg: deviceType === 'phone-small' ? 16 : 18,
        xl: deviceType === 'phone-small' ? 18 : 20,
        xxl: deviceType === 'phone-small' ? 20 : 24,
        },
        borderRadius: {
        sm: deviceType === 'phone-small' ? 6 : 8,
        md: deviceType === 'phone-small' ? 8 : 12,
        lg: deviceType === 'phone-small' ? 12 : 16,
        },
        iconSize: {
        sm: deviceType === 'phone-small' ? 16 : 20,
        md: deviceType === 'phone-small' ? 20 : 24,
        lg: deviceType === 'phone-small' ? 24 : 28,
        },
    };

    // Адаптивные стили
    const adaptiveStyles = StyleSheet.create({
        // Контейнеры
        container: {
        paddingHorizontal: adaptiveValues.spacing.md,
        },
        containerFluid: {
        paddingHorizontal: adaptiveValues.spacing.sm,
        },
        
        // Тексты
        textXs: {
        fontSize: adaptiveValues.fontSize.xs,
        lineHeight: adaptiveValues.fontSize.xs * 1.4,
        },
        textSm: {
        fontSize: adaptiveValues.fontSize.sm,
        lineHeight: adaptiveValues.fontSize.sm * 1.4,
        },
        textMd: {
        fontSize: adaptiveValues.fontSize.md,
        lineHeight: adaptiveValues.fontSize.md * 1.4,
        },
        textLg: {
        fontSize: adaptiveValues.fontSize.lg,
        lineHeight: adaptiveValues.fontSize.lg * 1.4,
        },
        textXl: {
        fontSize: adaptiveValues.fontSize.xl,
        lineHeight: adaptiveValues.fontSize.xl * 1.4,
        },
        
        // Заголовки
        title: {
        fontSize: adaptiveValues.fontSize.xxl,
        fontWeight: 'bold',
        lineHeight: adaptiveValues.fontSize.xxl * 1.2,
        },
        subtitle: {
        fontSize: adaptiveValues.fontSize.xl,
        fontWeight: '600',
        lineHeight: adaptiveValues.fontSize.xl * 1.2,
        },
        
        // Кнопки
        button: {
        paddingVertical: adaptiveValues.spacing.sm,
        paddingHorizontal: adaptiveValues.spacing.md,
        borderRadius: adaptiveValues.borderRadius.md,
        },
        buttonSmall: {
        paddingVertical: adaptiveValues.spacing.xs,
        paddingHorizontal: adaptiveValues.spacing.sm,
        borderRadius: adaptiveValues.borderRadius.sm,
        },
        buttonLarge: {
        paddingVertical: adaptiveValues.spacing.md,
        paddingHorizontal: adaptiveValues.spacing.lg,
        borderRadius: adaptiveValues.borderRadius.lg,
        },
        
        // Карточки
        card: {
        borderRadius: adaptiveValues.borderRadius.md,
        padding: adaptiveValues.spacing.md,
        marginBottom: adaptiveValues.spacing.md,
        },
    });

    return {
        deviceType,
        width,
        height,
        adaptiveValues,
        adaptiveStyles,
        isPhone: deviceType.includes('phone'),
        isTablet: deviceType.includes('tablet'),
        isSmallDevice: deviceType === 'phone-small',
        isIOS: Platform.OS === 'ios',
        isAndroid: Platform.OS === 'android',
    };
    };