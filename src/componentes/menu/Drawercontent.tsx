import React, { useEffect, useState } from 'react';
import {
    Button,
    Image,
    Stack,
    Box,
    HStack,
    Text,
    Pressable,
    ScrollView
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
import { customerDocumentId } from '../../services/SettingsService';
import { useRequestContext } from '../../services/context/RequestContext';

const DrawerContent = (props: any) => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const [
        { userInformation, userLoginData },
        { setUserInformation, setUserLoginData }
    ] = useUserSweet();
    const [documentIdentityCode, setDocumentIdentityCode] = useState('');
    const [t] = useTranslation();
    const [{}, { errorHandler, loadingHandler }] = useRequestContext();

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
        customerDocumentId(
            {
                phoneNumber: userLoginData.phoneNumber,
                phonePrefix: userLoginData.phonePrefix,
                documentIdentityCode
            },
            (res) => {
                if (res.object_[0].status === 'P') {
                    loadingHandler(false);
                    navigate(SceneNames.SuccessScreen as any, {
                        inReview: true,
                        transactionType: 'P'
                    });
                } else if (res.object_[0].status === 'N') {
                    loadingHandler(false);
                    navigate(SceneNames.AccountLimitsScreen);
                } else if (res.object_[0].status === 'E') {
                    loadingHandler(false);
                    navigate(SceneNames.SuccessScreen as any, {
                        inReview: true,
                        status: 'E'
                    });
                } else if (res.object_[0].status === 'C') {
                    loadingHandler(false);
                    navigate(SceneNames.SuccessScreen as any, {
                        inReview: true,
                        status: 'C'
                    });
                } else {
                    loadingHandler(false);
                    navigate(SceneNames.SuccessScreen as any, {
                        inReview: true,
                        status: 'A'
                    });
                }
            },
            errorHandler
        );
    };

    return (
        <Box
            backgroundColor={colors.neutral.WHITE}
            h={'full'}
            pt={10}
            safeArea
            pl={1}
        >
            <ScrollView>
                <Stack space={6} w="full">
                    <Button
                        variant="outline"
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.phone}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('my_number')}
                                {userLoginData.phonePrefix}{' '}
                                {userLoginData.phoneNumber}
                            </Text>
                        </HStack>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => navigate(SceneNames.DashboardScreen)}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.bankk}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('Dashboard')}
                            </Text>
                        </HStack>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => shareNafa()}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.bankk}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('invite_a_friend')}
                            </Text>
                        </HStack>
                    </Button>

                    <Button
                        variant="outline"
                        onPress={() => navigate(SceneNames.DashboardScreen)}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <Pressable
                            onPress={() => navigate(SceneNames.CallNafaForFree)}
                        >
                            <HStack alignItems="center" space={3}>
                                <Image
                                    source={icons.phone}
                                    alt="bank"
                                    w={[25, 35, 45]}
                                    h={[25, 35, 45]}
                                />
                                <Text fontSize={['sm', 'xl', 'xl']}>
                                    {t('call_nafa_for')}
                                </Text>
                            </HStack>
                        </Pressable>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => navigate(SceneNames.NearbyAgentsScreen)}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.location}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('find_nearby')}
                            </Text>
                        </HStack>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => onPress()}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.notes}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('check_limits')}
                            </Text>
                        </HStack>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => navigate(SceneNames.RedeemCodeScreen)}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.reset}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('reset_secret')}
                            </Text>
                        </HStack>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() =>
                            navigate(SceneNames.SelectLanguageScreen)
                        }
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.notes}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('language')}
                            </Text>
                        </HStack>
                    </Button>

                    <Button
                        variant="outline"
                        onPress={() => navigate(SceneNames.FeedBackScreen)}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.share}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('feedBack')}
                            </Text>
                        </HStack>
                    </Button>

                    {/* <Button
                        variant="outline"
                        onPress={() => navigate(SceneNames.RecipientInfoScreen)}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.notes}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('receipt_info')}
                            </Text>
                        </HStack>
                    </Button> */}

                    <Button
                        variant="outline"
                        onPress={() =>
                            Linking.openURL(
                                'https://www.sikacash.com/home/LicenseandAgreement'
                            )
                        }
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.notes}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('term_and_conditions')}
                            </Text>
                        </HStack>
                    </Button>
                    <Button
                        variant="outline"
                        onPress={() => {
                            setUserInformation({});
                            setUserLoginData({});
                        }}
                        w="100%"
                        h={[30, 50, 70]}
                        borderWidth={0}
                        _text={{
                            color: colors.neutral.BLACK
                        }}
                        justifyContent="flex-start"
                        backgroundColor={colors.neutral.WHITE}
                        _pressed={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: colors.primary.FIRST
                        }}
                    >
                        <HStack alignItems="center" space={3}>
                            <Image
                                source={icons.logout}
                                alt="bank"
                                w={[25, 35, 45]}
                                h={[25, 35, 45]}
                            />
                            <Text fontSize={['sm', 'xl', 'xl']}>
                                {t('exit')}
                            </Text>
                        </HStack>
                    </Button>
                </Stack>
                <Text
                    alignSelf={'center'}
                    marginTop={'30%'}
                    justifyContent={'center'}
                    fontSize={['sm', 'xl', 'xl']}
                >
                    {t('v 1.1')}
                </Text>
            </ScrollView>
        </Box>
    );
};
export default DrawerContent;
