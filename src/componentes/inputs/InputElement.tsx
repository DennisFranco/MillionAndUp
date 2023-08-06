import React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardType,
} from 'react-native';
import colors from '../../theme/colors';
import {fontFamily} from '../../theme';
import {vw, vh} from '../../theme/scale';
import {normalize} from '../../theme/dimesion';
import {useTranslation} from 'react-i18next';

type Props = {
  onChangeText?: any;
  text?: string;
  value?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  keyboardType?: KeyboardType;
  password?: boolean;
  loading?: boolean;
  transparent?: boolean;
  tab?: boolean;
};
const InputElement = ({
  onChangeText,
  text,
  value,
  style,
  styleText,
  disabled,
  keyboardType = 'default',
  password = false,
  loading,
  transparent,
  tab,
}: Props) => {
  const {t} = useTranslation();

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

  return (
    <View>
      <Text
        style={{
          width: '100%',
          marginTop: normalize(25),
          fontSize: normalize(16),
          fontFamily: fontFamily.PoppinsRegular,
          color: colors.TEXT_BLACK
        }}>
        {text}
      </Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder={text}
          placeholderTextColor="#828991"
          value={value}
          autoComplete={'off'}
          onChangeText={onChangeText}
          secureTextEntry={password}
          keyboardType={keyboardType}
          returnKeyType="next"
          style={styles.text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    height: normalize(55),
    borderRadius: 10,
    borderWidth: 0.8,
    flexDirection: 'row',
    backgroundColor: colors.BACKGROUND_WHITE,
    overflow: 'hidden',
  },
  text: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: normalize(17),
    height: normalize(55),
    width: normalize(270),
    borderRadius: 5,
    backgroundColor: colors.BACKGROUND_WHITE,
    paddingBottom: normalize(5),
    color: colors.TEXT_BLACK,
  },
});

export default InputElement;
