    import { Dimensions, PixelRatio } from 'react-native';

    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

    const baseWidth = 375;
    const baseHeight = 812;

    export const wp = (widthPercent: number) => {
    const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
    };

    export const hp = (heightPercent: number) => {
    const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
    };

    export const fontSize = (size: number) => {
    const scale = SCREEN_WIDTH / baseWidth;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
    };

    export const spacing = {
    xs: hp(1),    // ~8px
    sm: hp(1.5),  // ~12px
    md: hp(2),    // ~16px
    lg: hp(2.5),  // ~20px
    xl: hp(3),    // ~24px
    xxl: hp(4),   // ~32px
    };

    export const isSmallDevice = SCREEN_WIDTH < 375;
    export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
    export const isLargeDevice = SCREEN_WIDTH >= 414;
    export const isTablet = SCREEN_WIDTH >= 768;