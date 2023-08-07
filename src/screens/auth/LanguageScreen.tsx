import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Stack,
  Button,
  HStack,
  Image,
  Heading,
  VStack,
  Spinner,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import colors from '../../theme/colors';
import {icons} from '../../assets/images/icons';
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import {
  getPersist,
  persist,
  useRequestContext,
} from '../../services/context/RequestContext';
import SceneNames from '../../navigation/SceneNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageScreen = () => {
  const [t, i18n] = useTranslation();
  const [press, setPress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pressButton, setPressButton] = useState(0);
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [{}, {errorHandler}] = useRequestContext();

  const lang = async (data: string) => {
    setLoading(true);
    i18n.changeLanguage(data);
    await AsyncStorage.setItem('hasLang', data);
    setLoading(false);
    setPress(true);
  };

  return (
    <Box
      flex={1}
      safeArea
      bg={colors.primary.FIRST}
      justifyContent={'center'}
      alignItems={'center'}>
      <Box
        w={['xs', 'md', 'lg']}
        h={['lg', 'xl', '2xl']}
        rounded={'lg'}
        backgroundColor={colors.neutral.WHITE}
        shadow={9}
        py={[2, 4, 6]}>
        <VStack space={8} justifyContent={'center'} alignItems={'center'}>
          <Image
            source={icons.mainIcon}
            alt={'image'}
            size={[32, 48, 64]}
            rounded={'lg'}
          />
        </VStack>
        <Stack space={10} mt={[10, 12, 16]}>
          <Stack alignItems={'center'}>
            <Heading fontSize={['xl', '2xl', '3xl']}>{t('language')}</Heading>
            <Text fontSize={['xs', 'md', 'xl']} color={colors.primary.FIRST}>
              {t('choose_language')}
            </Text>
          </Stack>
          <VStack
            alignItems={'center'}
            space={4}
            justifyContent="space-between"
            px={[6, 8, 10]}>
            <Button
              h={[53, 65, 20]}
              w={['full', 'lg', '2xl']}
              rounded={'xl'}
              variant={'outline'}
              backgroundColor={
                pressButton == 1 ? colors.primary.SECOND : colors.neutral.WHITE
              }
              isPressed={pressButton == 1 ? true : false}
              _pressed={{
                borderWidth: 1,
                borderColor: colors.primary.SECOND,
              }}
              onPress={() => {
                lang('en');
                setPressButton(1);
              }}
              _text={{
                fontSize: ['sm', 'md', '4xl'],
                color: colors.text.TEXT_WHITE,
              }}>
              <HStack alignItems={'center'}>
                <Image
                  resizeMode="contain"
                  size={[8, 10, 12]}
                  source={icons.EN_flag}
                  alt="English (US)"
                />
                <Text
                  color={
                    pressButton == 1
                      ? colors.neutral.WHITE
                      : colors.neutral.BLACK
                  }
                  fontSize={['md', 'lg', '4xl']}
                  pl={[4, 6, 8]}>
                  {t('English')}
                </Text>
              </HStack>
            </Button>

            <Button
              h={[53, 65, 20]}
              w={['full', 'lg', '2xl']}
              rounded={'xl'}
              _text={{
                fontSize: ['sm', 'md', '4xl'],
                color: colors.text.TEXT_WHITE,
              }}
              variant={'outline'}
              backgroundColor={
                pressButton == 2 ? colors.primary.SECOND : colors.neutral.WHITE
              }
              isPressed={pressButton == 2 ? true : false}
              _pressed={{
                borderWidth: 1,
                borderColor: colors.primary.SECOND,
              }}
              onPress={() => {
                lang('es');
                setPressButton(2);
              }}>
              <HStack alignItems={'center'}>
                <Image
                  resizeMode="contain"
                  size={[8, 10, 12]}
                  source={icons.ES_flag}
                  alt="Spanish"
                />
                <Text
                  color={
                    pressButton == 2
                      ? colors.neutral.WHITE
                      : colors.neutral.BLACK
                  }
                  fontSize={['md', 'lg', '4xl']}
                  pl={[4, 6, 8]}>
                  {t('Spanish')}
                </Text>
              </HStack>
            </Button>

            <Button
              onPress={() => {
                if (pressButton != 0) {
                  navigate(SceneNames.WelcomeScreen);
                } else {
                  errorHandler(t('choose_language'));
                }
              }}
              mt={[10]}
              h={[53, 65, 20]}
              w={['full', 'lg', '2xl']}
              rounded={'xl'}
              backgroundColor={
                press ? colors.primary.FIRST : colors.neutral.GRAY
              }
              _pressed={
                press
                  ? {
                      backgroundColor: colors.primary.FIRST,
                    }
                  : {
                      backgroundColor: colors.neutral.GRAY_LIGHT,
                    }
              }
              isLoading={loading}
              _text={{
                fontSize: ['sm', 'md', '2xl'],
                color: colors.text.TEXT_WHITE,
                textAlign: 'center',
              }}>
              {t('next')}
            </Button>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};
export default LanguageScreen;
