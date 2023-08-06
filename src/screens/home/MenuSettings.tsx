import React, { useEffect, useState } from 'react';
import {
    Button,
    Image,
    Stack,
    Box,
    HStack,
    Text,
    Pressable,
    ScrollView,
    View,
    Center
} from 'native-base';
import SceneNames from '../../navigation/SceneNames';
import { GenericStackNavigationProp } from '../../navigation/StackNavigationProp';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import {
    useUserSweet,
    UserInformation
} from '../../services/context/useUserSweet';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, Share } from 'react-native';
import { icons } from '../../assets/images/icons';
import { useRequestContext } from '../../services/context/RequestContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuSettings = () => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const [
        { userInformation, userLoginData },
        { setUserInformation, setUserLoginData, setToken }
    ] = useUserSweet();
    const [documentIdentityCode, setDocumentIdentityCode] = useState('');
    const [t] = useTranslation();
    const [{}, { errorHandler, loadingHandler, successHandler }] =
        useRequestContext();

    const shareNafa = async () => {
        const shareOptions = {
            message: t('i_invite_you_to_discover'),
            url:
                Platform.OS === 'android'
                    ? 'https://play.google.com/store/apps/details?id=com.send.nafawallet2'
                    : 'https://apps.apple.com/pe/app/my-nafa/id1637658879'
        };

        Share.share(shareOptions);
    };

    const onPress = () => {
        
    };

    return (
        <Box h={'full'}>
            <ScrollView>
                <Stack w="full" mt={4}>
                    <Box w="full">
                        <Text
                            alignSelf={'center'}
                            justifyContent={'center'}
                            fontSize={['md', 'xl', 'xl']}
                            bold
                        >
                            {t('me')}
                        </Text>
                    </Box>

                    <Box mt={'6'}>
                        <Button
                            variant="outline"
                            onPress={() => shareNafa()}
                            h={[60, 70, 100]}
                            m={2}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.invite_friend_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '2xl']}>
                                    {t('invite_a_friend')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    ml={[320, 480, 700]}
                                    position="absolute"
                                />
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onPress={() => successHandler(t('coming_soon'))}
                            h={[60, 70, 100]}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                            m={2}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.call_nafa_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '2xl']}>
                                    {t('call_nafa_for')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    position="absolute"
                                    ml={[320, 480, 700]}
                                />
                            </HStack>
                        </Button>
                    </Box>

                    <Box>
                        <Text
                            m={'4'}
                            mt={'5%'}
                            justifyContent={'center'}
                            fontSize={['md', 'xl', 'xl']}
                            bold
                        >
                            {t('account')}
                        </Text>
                        <Button
                            variant="outline"
                            onPress={() => successHandler(t('coming_soon'))}
                            h={[60, 70, 100]}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                            m={2}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.profile_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '2xl']}>
                                    {t('personal_info')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    position="absolute"
                                    ml={[320, 480, 700]}
                                />
                            </HStack>
                        </Button>
                        <Button
                            variant="outline"
                            onPress={() => successHandler(t('coming_soon'))}
                            h={[60, 70, 100]}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                            m={2}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.feedback_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '2xl']}>
                                    {t('payment_info')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    position="absolute"
                                    ml={[320, 480, 700]}
                                />
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onPress={() =>
                                navigate(SceneNames.DashboardScreen)
                            }
                            h={[60, 70, 100]}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                            m={2}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.reset_pin_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '3xl']}>
                                    {t('reset_secret')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    ml={[320, 480, 700]}
                                    position="absolute"
                                />
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onPress={() => onPress()}
                            h={[60, 70, 100]}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                            m={2}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.reset_pin_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '3xl']}>
                                    {t('check_limits')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    ml={[320, 480, 700]}
                                    position="absolute"
                                />
                            </HStack>
                        </Button>

                        <Button
                            variant="outline"
                            onPress={() =>
                                Linking.openURL(
                                    'https://www.sikacash.com/home/LicenseandAgreement'
                                )
                            }
                            h={[60, 70, 100]}
                            m={2}
                            _text={{
                                color: colors.neutral.BLACK
                            }}
                            justifyContent="flex-start"
                            backgroundColor={colors.neutral.WHITE}
                            borderWidth={0}
                        >
                            <HStack w={'150%'} alignItems="center" space={4}>
                                <Image
                                    source={icons.term_and_conditions_green}
                                    ml={7}
                                    alt="bank"
                                    size={[10, 12, 70]}
                                />
                                <Text fontSize={['md', 'xl', '2xl']}>
                                    {t('term_and_conditions')}
                                </Text>
                                <Image
                                    source={icons.setting_arrow}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                    ml={[320, 480, 700]}
                                    position="absolute"
                                />
                            </HStack>
                        </Button>
                    </Box>
                    <Button
                        variant="outline"
                        onPress={async () => {
                            await AsyncStorage.setItem('@token', '');
                            setToken({ key: null });
                            setUserInformation({});
                            setUserLoginData({});
                        }}
                        h={[60, 70, 100]}
                        mt={'5%'}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        borderWidth={0}
                        alignSelf={'center'}
                    >
                        <HStack w={'150%'} alignItems="center" space={4}>
                            <Image
                                source={icons.logout_sika}
                                alt="bank"
                                size={[10, 12, 70]}
                            />
                            <Text fontSize={['md', 'xl', '2xl']}>
                                {t('log_out')}
                            </Text>
                        </HStack>
                    </Button>
                </Stack>
            </ScrollView>
        </Box>
    );
};
export default MenuSettings;
