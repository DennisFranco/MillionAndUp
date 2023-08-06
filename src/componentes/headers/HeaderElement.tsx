import React from 'react';
import {moderateScale} from '../../theme/scale';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import colors from '../../theme/colors';
import {fontFamily} from '../../theme';
import {vw, vh} from '../../theme/scale';
import {icons} from '../../assets/images/icons';
type Props = {
  onPress?: any;
  title?: string;
};
const HeaderElement = ({onPress, title}: Props) => {
  return (
    <View
      style={{
        height: vh(60),
        flexDirection: 'row',
      }}>
      <View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <Image source={icons.leftArrow} />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontFamily: fontFamily.PoppinsMedium,
            fontSize: moderateScale(16),
            color: colors.PRIMARY,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderElement;
