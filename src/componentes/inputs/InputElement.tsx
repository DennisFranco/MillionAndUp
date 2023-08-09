import React from 'react';
import colors from '../../theme/colors';
import {useTranslation} from 'react-i18next';
import {FormControl, Input, Text} from 'native-base';

type Props = {
  onChangeText?: any;
  errors?: string;
  value?: string;
  title?: string;
};
const InputElement = ({onChangeText, errors, value, title}: Props) => {
  const {t} = useTranslation();

  return (
    <FormControl isRequired w={'full'} data-testid="InputElement">
      <FormControl.Label>{title}</FormControl.Label>
      <Input
        h={[53, 60, 70]}
        rounded={'xl'}
        keyboardType={'default'}
        borderColor={colors.primary.FIRST}
        fontSize={['sm', 'md', '2xl']}
        value={value}
        onChangeText={onChangeText}
        bg={colors.neutral.WHITE}
        borderWidth={[1, 2, 2]}
      />
      <Text
        color={colors.text.TEXT_ERROR}
        pb={[2, 4, 0]}
        pl={[2, 4, 6]}
        fontSize={['sm', 'md', 'xl']}>
        {errors}
      </Text>
    </FormControl>
  );
};

export default InputElement;
