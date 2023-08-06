import React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import {fontFamily} from '../../theme';
import {vw, vh} from '../../theme/scale';

type Props = {
  onPress?: any;
  text?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  loading?: boolean;
  transparent?: boolean;
  tab?: boolean;
};
const ButtonElement = ({
  onPress,
  text,
  style,
  styleText,
  disabled,
  loading,
  transparent,
  tab,
}: Props) => {
  const getBgColor = () => {
    if (loading) {
      return colors.PRIMARY;
    }
    if (transparent) {
      return 'transparent';
    }
    if (tab) {
      return colors.PRIMARY;
    }

    return colors.TERTIARY;
  };

  const getTextColor = () => {
    if (transparent) {
      return colors.TEXT_PRIMARY;
    }
    return colors.TEXT_WHITE;
  };

  const indicatorColor = disabled ? colors.TEXT_GRAY : colors.TEXT_WHITE;

  return (
    <TouchableOpacity
      accessible={disabled}
      onPress={onPress}
      style={[styles.container, {backgroundColor: getBgColor()}, style]}>
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={[styles.text, styleText, {color: getTextColor()}]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: vw(157),
    height: vh(40),
    backgroundColor: colors.PRIMARY,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.TEXT_WHITE,
    fontFamily: fontFamily.PoppinsMedium,
  },
});

export default ButtonElement;
