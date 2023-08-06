import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import { normalize } from '../../theme/scale';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
    name?: any;
    color?: any;
    size?: any;
    style?: StyleProp<ViewStyle>;
};
const IconElement = ({ name, color, size, style }: Props) => {
    return <Icon name={name} size={size} color={color} style={style} />;
};

export default IconElement;
