import React from 'react';
import colors from '../../theme/colors';
import {Button} from 'native-base';

type Props = {
  onPress?: any;
  text?: string;
};
const ButtonElement = ({onPress, text}: Props) => {
  return (
    <Button
    data-testid="buttonElement"
      h={[12, 16, 20]}
      w={'full'}
      rounded={'xl'}
      onPress={onPress}
      _pressed={{
        backgroundColor: colors.primary.SECOND,
      }}
      bg={colors.primary.FIRST}
      _text={{
        fontSize: ['sm', 'md', '2xl'],
        color: colors.text.TEXT_WHITE,
        textAlign: 'center',
      }}>
      {text}
    </Button>
  );
};

export default ButtonElement;
