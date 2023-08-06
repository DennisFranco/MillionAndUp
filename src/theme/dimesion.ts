import { Dimensions, PixelRatio } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export var DesignHeight = 833;
// export var DesignHeight = 667;
export var DesignWidth = 396;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// It is based on the screen width of your design layouts e.g Height 600 x Width 375
const scale = SCREEN_WIDTH / 396;

export function normalize(size: number) {
    return PixelRatio.roundToNearestPixel(size * scale);
}

export const vw = (width: number) => {
    const percent = (width / DesignWidth) * 100;
    const elemWidth = parseFloat(`${percent}%`);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const vh = (height: number) => {
    const percent = (height / DesignHeight) * 100;
    const elemHeight = parseFloat(`${percent}%`);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};
