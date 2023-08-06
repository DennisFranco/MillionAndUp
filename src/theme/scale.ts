import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

export const vw = (size: number) => (width / baseWidth) * size;
export const vh = (size: number) => (height / baseHeight) * size;

export const moderateScale = (size: number) => {
    let factor = 0.9;
    if (width >= 768) {
        factor = 1.3;
    } else {
        factor = 0.9;
    }
    return PixelRatio.roundToNearestPixel(size * factor);
};

export const normalize = (size: number) => {
    return PixelRatio.roundToNearestPixel(size * (width / baseWidth));
};
