import React from 'react';
import {
  Button,
  Stack,
  Box,
  HStack,
  Text,
  ScrollView,
  VStack,
  Avatar,
  Pressable,
} from 'native-base';
import SceneNames from '../../navigation/SceneNames';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import {useNavigation} from '@react-navigation/native';
import colors from '../../theme/colors';
import {useUserSweet} from '../../services/context/useUserSweet';
import {useTranslation} from 'react-i18next';
import {Linking, Platform, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../theme/dimesion';
import {useRequestContext} from '../../services/context/RequestContext';

const MenuSettingsScreen = () => {
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [{userLoginData, token}, {setToken, setUserLoginData}] = useUserSweet();
  const [{}, {successHandler}] = useRequestContext();
  const [t] = useTranslation();

  const shareApp = async () => {
    const shareOptions = {
      message: t('i_invite_you_to_discover'),
      url:
        Platform.OS === 'android'
          ? 'https://play.google.com'
          : 'https://apps.apple.com',
    };

    Share.share(shareOptions);
  };

  return (
    <Box flex={1} bg={colors.neutral.WHITE}>
      <Box
        height={[56, 64, 72]}
        bg={colors.primary.FIRST}
        justifyContent="center"
        mb={[5]}>
        <VStack alignItems="center" justifyContent="center">
          <Avatar
            bg="amber.500"
            source={{
              uri: userLoginData.name
                ? 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                : '',
            }}
            size="2xl">
            NN
            <Avatar.Badge bg="green.500" />
          </Avatar>

          <VStack w={'90%'} m={3} justifyContent="center">
            <Text
              fontSize={['lg', 'xl', '3xl']}
              bold
              color={colors.neutral.WHITE}>
              {userLoginData?.name}
            </Text>
            <Text
              fontSize={['md', 'lg', 'xl']}
              isTruncated
              w="80%"
              color={colors.neutral.WHITE}>
              {userLoginData?.email}
            </Text>
          </VStack>
        </VStack>
      </Box>
      <ScrollView>
        <Stack w="full" alignItems={'center'}>
          <Stack space={4} p={2} w="full">
            <Button
              variant="outline"
              onPress={() => shareApp()}
              h={[60, 70, 100]}
              w={['full']}
              _text={{
                color: colors.neutral.BLACK,
              }}
              justifyContent="flex-start"
              backgroundColor={colors.neutral.WHITE}
              borderWidth={0}
              shadow={5}>
              <HStack w={'100%'} alignItems="center" space={5}>
                <Ionicons
                  name={'share-social-outline'}
                  size={normalize(30)}
                  color={colors.primary.FIRST}
                />
                <Text fontSize={['md', 'xl', '2xl']}>
                  {t('invite_a_friend')}
                </Text>
              </HStack>
            </Button>

            <Button
              variant="outline"
              onPress={() => successHandler(t('coming_soon'))}
              h={[60, 70, 100]}
              w={['full']}
              _text={{
                color: colors.neutral.BLACK,
              }}
              justifyContent="flex-start"
              backgroundColor={colors.neutral.WHITE}
              borderWidth={0}
              shadow={5}>
              <HStack w={'full'} alignItems="center" space={4}>
                <Ionicons
                  name={'person-circle-outline'}
                  size={normalize(30)}
                  color={colors.primary.FIRST}
                />
                <Text fontSize={['md', 'xl', '3xl']}>{t('profile')}</Text>
              </HStack>
            </Button>

            <Button
              variant="outline"
              onPress={() => navigate(SceneNames.SelectLanguageScreen)}
              h={[60, 70, 100]}
              w={['full']}
              _text={{
                color: colors.neutral.BLACK,
              }}
              justifyContent="flex-start"
              backgroundColor={colors.neutral.WHITE}
              borderWidth={0}
              shadow={5}>
              <HStack w={'full'} alignItems="center" space={4}>
                <Ionicons
                  name={'earth'}
                  size={normalize(30)}
                  color={colors.primary.FIRST}
                />
                <Text fontSize={['md', 'xl', '3xl']}>{t('change_lang')}</Text>
              </HStack>
            </Button>

            <Button
              variant="outline"
              onPress={() => Linking.openURL('https://es.lipsum.com/')}
              h={[60, 70, 100]}
              w={['full']}
              _text={{
                color: colors.neutral.BLACK,
              }}
              justifyContent="flex-start"
              backgroundColor={colors.neutral.WHITE}
              borderWidth={0}
              shadow={5}>
              <HStack w={'full'} alignItems="center" space={4}>
                <Ionicons
                  name={'document-text-outline'}
                  size={normalize(30)}
                  color={colors.primary.FIRST}
                />
                <Text fontSize={['md', 'xl', '2xl']}>
                  {t('term_and_conditions')}
                </Text>
              </HStack>
            </Button>
          </Stack>

          {userLoginData.email ? (
            <Button
              variant="outline"
              onPress={() => {
                setUserLoginData({});
                setToken({key: ''});
              }}
              h={[60, 70, 100]}
              mt={'5%'}
              _text={{
                color: colors.neutral.BLACK,
              }}
              justifyContent="flex-start"
              borderWidth={0}
              alignSelf={'center'}
              shadow={5}>
              <HStack w={'full'} alignItems="center" space={4}>
                <Ionicons
                  name={'log-out-outline'}
                  size={normalize(30)}
                  color={colors.primary.FIRST}
                />
                <Text fontSize={['md', 'xl', '2xl']}>{t('log_out')}</Text>
              </HStack>
            </Button>
          ) : (
            <Pressable pt={[8, 10, 10]} onPress={() => setToken({key: ''})}>
              <Text
                color={colors.neutral.GRAY_LIGHT}
                fontSize={['sm', 'md', '2xl']}>
                {t('dont_have_an_account')}{' '}
                <Text
                  color={colors.primary.FIRST}
                  bold
                  fontSize={['sm', 'md', 'lg']}>
                  {t('btn_sign_up')}
                </Text>
              </Text>
            </Pressable>
          )}
        </Stack>
      </ScrollView>
    </Box>
  );
};
export default MenuSettingsScreen;
