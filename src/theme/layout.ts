import { Dimensions } from 'react-native';

export const screenSize = {
    screenHeight: Math.round(Dimensions.get('window').height),
    screenWidth: Math.round(Dimensions.get('window').width)
};
