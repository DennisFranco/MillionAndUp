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
} from 'native-base';
import SceneNames from '../../navigation/SceneNames';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import {useNavigation} from '@react-navigation/native';
import colors from '../../theme/colors';
import {useUserSweet} from '../../services/context/useUserSweet';
import {useTranslation} from 'react-i18next';
import {Platform, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../theme/dimesion';

const MenuSettings = () => {
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [
    {userInformation, userLoginData},
    {setUserInformation, setUserLoginData, setToken},
  ] = useUserSweet();
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
    <Box flex={1}>
      <Box
        height={[56, 64, 72]}
        bg={colors.primary.FIRST}
        justifyContent="center"
        mb={[5]}>
        <VStack alignItems="center" justifyContent="center">
          <Avatar
            bg="amber.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            size="2xl">
            NB
            <Avatar.Badge bg="green.500" />
          </Avatar>

          <VStack w={'90%'} m={3} justifyContent="center">
            <Text
              fontSize={['lg', 'xl', '3xl']}
              bold
              color={colors.neutral.WHITE}>
              User Name
            </Text>
            <Text
              fontSize={['md', 'lg', 'xl']}
              isTruncated
              w="80%"
              color={colors.neutral.WHITE}>
              User@mail.com
            </Text>
          </VStack>
        </VStack>
      </Box>
      <ScrollView>
        <Stack w="full">
          <Stack space={4} p={2}>
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

          <Button
            variant="outline"
            onPress={() => navigate(SceneNames.SignInScreen)}
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
        </Stack>
      </ScrollView>
    </Box>
  );
};
export default MenuSettings;
