import React from 'react';
import {
  Box,
  Text,
  Image,
  HStack,
  Pressable,
  VStack,
  ScrollView,
  Link,
} from 'native-base';
import {icons} from '../../assets/images/icons';
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import {useTranslation} from 'react-i18next';
import colors from '../../theme/colors';
import {useUserSweet} from '../../services/context/useUserSweet';

const PreviewScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [{}, {setToken}] = useUserSweet();

  return (
    <Box flex={1} safeArea bg={colors.neutral.WHITE}>
      <ScrollView>
        <VStack px={[6, 8, 10]}>
          <HStack
            space={3}
            pt={[10, 32, 40]}
            justifyContent={'center'}
            alignItems={'center'}
            mb={[10, 12, 16]}>
            <Image
              source={icons.mainIcon}
              alt="image"
              size={'2xl'}
              rounded={'2xl'}
            />
          </HStack>

          <Text fontSize={'4xl'} bold>
            {t('regards')}
          </Text>

          <Text fontSize={'2xl'} color={colors.primary.FIRST} bold>
            {t('welcome')} MILLION AND UP
          </Text>

          <Text fontSize={['md', 'lg', 'xl']}>{t('info')}</Text>

          <HStack justifyContent={'flex-start'} my={10}>
            <Pressable
              alignItems={'center'}
              onTouchStart={() => navigate('SignInScreen')}
              w={['30%']}
              py={3}
              bg={colors.primary.FIRST}
              rounded={'lg'}
              mr={6}>
              <Text
                color={colors.text.TEXT_WHITE}
                bold
                fontSize={['sm', 'md', '2xl']}>
                {t('btn_login')}
              </Text>
            </Pressable>
            <Pressable
              alignItems={'center'}
              onTouchStart={() => navigate('RegisterScreen')}
              w={['30%']}
              py={3}
              bg={colors.primary.SECOND}
              rounded={'lg'}>
              <Text
                color={colors.text.TEXT_WHITE}
                bold
                fontSize={['sm', 'md', '2xl']}>
                {t('btn_sign_up')}
              </Text>
            </Pressable>
          </HStack>
          <Link
            onPress={() =>
              setToken({key: Math.random().toString(36).substr(2)})
            }
            _text={{color: colors.primary.FIRST}}>
            {t('without_login')}
          </Link>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default PreviewScreen;
