import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';
import {
    Image,
    Stack,
    Text,
    VStack,
    HStack,
    Box,
    Button,
    Pressable,
    ScrollView,
    Icon
} from 'native-base';
import { icons } from '../../assets/images/icons';
import { useRequestContext } from '../../services/context/RequestContext';
import { useUserSweet } from '../../services/context/useUserSweet';
import SceneNames from '../../navigation/SceneNames';
import { GenericStackNavigationProp } from '../../navigation/StackNavigationProp';
import { useNavigation } from '@react-navigation/native';
import {
    TopNWalletTransactions,
    getTopNWalletTransactions
} from '../../services/DashboardService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RefreshControl } from 'react-native';

Ionicons.loadFont();
const DashboardScreen = () => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const navigation = useNavigation<GenericStackNavigationProp>();
    const [{}, { loadingHandler, errorHandler }] = useRequestContext();
    const [{ userLoginData, userInformation, token, agencyInfo }] =
        useUserSweet();
    const [refreshing, setRefreshing] = useState(false);

    const [dataTransactions, setDataTransactions] =
        useState<TopNWalletTransactions[]>();

    const monthNames = [
        t('Jan'),
        t('Feb'),
        t('Mar'),
        t('Apr'),
        t('May'),
        t('Jun'),
        t('Jul'),
        t('Aug'),
        t('Sep'),
        t('Oct'),
        t('Nov'),
        t('Dec')
    ];

    useEffect(() => {
        loadingHandler(true);
        getTopNWalletTransactions(
            {
                customerId: userInformation.identityCode,
                agencyCode: agencyInfo.code
            },
            (result) => {
                if (result.code === '1') {
                    setDataTransactions(result.object_);
                } else {
                    // @TODO:error de balance not exist
                    // errorHandler(result.description);
                }
            },
            errorHandler
        );
        loadingHandler(false);
    }, []);

    const initial = () => {
        if (token.key) {
            loadingHandler(true);
            getTopNWalletTransactions(
                {
                    customerId: userInformation.identityCode,
                    agencyCode: agencyInfo.code
                },
                (result) => {
                    if (result.code === '1') {
                        setDataTransactions(result.object_);
                    } else {
                        // @TODO:error de balance not exist
                        // errorHandler(result.description);
                    }
                },
                errorHandler
            );
            loadingHandler(false);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            initial();
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        initial();
        const willFocusSubscription = navigation.addListener('focus', () => {
            initial();
        });
        return willFocusSubscription;
    }, []);

    const onPress = () => {
        
    };

    return (
        <Box flex={1} bg={colors.neutral.WHITE} safeArea>
            <Stack
                px={[6, 8, 10]}
                h={['full', 'full', 'full']}
                space={[10, 12, 16]}
            >
                <HStack
                    h={[20, 24, 32]}
                    w={'100%'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mt={2}
                >
                    <VStack>
                        <Text
                            fontSize={['md', 'lg', 'xl']}
                            color={colors.text.TEXT_GRAY}
                        >
                            {t('regards')}
                            {', '}
                        </Text>
                        <Text
                            fontSize={['md', 'lg', 'xl']}
                            color={colors.text.TEXT_GRAY}
                        >
                            {t('question_dashboard')}
                        </Text>
                    </VStack>
                    <Pressable
                        onPress={() => navigate(SceneNames.MenuSettings)}
                        bg={colors.primary.FIRST}
                        _pressed={{
                            bg: colors.primary.DARKFIRST
                        }}
                        w={[10, 12, 16]}
                        h={[10, 12, 16]}
                        rounded={'xl'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Image
                            source={icons.setting}
                            alt="settings"
                            w={[6, 8, 10]}
                            h={[6, 8, 10]}
                        />
                    </Pressable>
                </HStack>

                <HStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'100%'}
                    h={[40, 40, 72]}
                    bg={colors.primary.FIRST}
                    rounded={'xl'}
                    px={[4, 6, 8]}
                    space={2}
                >
                    <Button
                        h={[53, 60, 20]}
                        onPress={() => navigate(SceneNames.RefundScreen)}
                        w={['50%']}
                        rounded={'xl'}
                        _pressed={{
                            backgroundColor: colors.primary.DARKSECOND
                        }}
                        bg={colors.primary.SECOND}
                        p={0}
                    >
                        <HStack
                            alignItems={'center'}
                            justifyContent={'center'}
                            h={'full'}
                            w={[40, 48, 56]}
                            rounded={'xl'}
                        >
                            <Stack
                                h={'full'}
                                w="20%"
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Icon
                                    as={Ionicons}
                                    name="wallet"
                                    color={colors.neutral.WHITE}
                                    size={[6, 8, 10]}
                                />
                            </Stack>
                            <VStack
                                h={'full'}
                                w={['40%']}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Text
                                    alignItems={'flex-start'}
                                    alignSelf={'flex-start'}
                                    color={colors.text.TEXT_WHITE}
                                    fontSize={['sm', 'lg', '2xl']}
                                >
                                    {t('send')}
                                </Text>
                            </VStack>
                        </HStack>
                    </Button>
                    {/* <Button
                        h={[53, 60, 20]}
                        w={['50%']}
                        rounded={'xl'}
                        _pressed={{
                            backgroundColor: colors.primary.DARKSECOND
                        }}
                        bg={colors.primary.SECOND}
                    >
                        <HStack
                            alignItems={'center'}
                            justifyContent={'center'}
                            h={'full'}
                            rounded="xl"
                            w={[40, 48, 56]}
                        >
                            <Stack
                                h={'full'}
                                w="20%"
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Icon
                                    as={FontAwesome}
                                    name="bank"
                                    color={colors.neutral.WHITE}
                                    size={[5, 8, 10]}
                                />
                            </Stack>
                            <VStack
                                h={'full'}
                                w={['60%']}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <Text
                                    alignItems={'flex-start'}
                                    alignSelf={'flex-start'}
                                    color={colors.text.TEXT_WHITE}
                                    fontSize={['sm', 'lg', '2xl']}
                                >
                                    {t('textBankNew')}
                                </Text>
                            </VStack>
                        </HStack>
                    </Button> */}
                </HStack>

                <VStack h={'55%'} w={'full'}>
                    <HStack justifyContent={'space-between'}>
                        <Text
                            fontSize={['md', 'xl', '2xl']}
                            color={colors.text.TEXT_BLACK}
                            bold
                            mb={[5]}
                        >
                            {t('recent_transactions')}
                        </Text>
                        <Text
                            fontSize={['md', 'xl', '2xl']}
                            color={colors.text.TEXT_BLACK}
                            bold
                            mb={[5]}
                        >
                            {t('view_all')}
                        </Text>
                    </HStack>

                    <ScrollView
                        disableScrollViewPanResponder={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {dataTransactions ? (
                            dataTransactions.map(
                                (transaction: any, index: any) => (
                                    <Pressable
                                        onPress={() =>
                                            navigate(SceneNames.RefundScreen)
                                        }
                                        rounded="xl"
                                        bg={colors.neutral.GRAY_THIRD}
                                        w={'full'}
                                        h={[20, 24, 32]}
                                        mb={[3]}
                                        key={index}
                                    >
                                        <HStack
                                            alignItems={'center'}
                                            justifyContent={'center'}
                                            h={'full'}
                                            rounded="xl"
                                        >
                                            <Stack
                                                h={'full'}
                                                w="20%"
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                            >
                                                <Image
                                                    source={icons.newAirtime2}
                                                    alt="image"
                                                    size={[12, 16, 20]}
                                                />
                                            </Stack>
                                            <VStack
                                                h={'full'}
                                                w={['50%']}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                            >
                                                <Text
                                                    alignItems={'flex-start'}
                                                    alignSelf={'flex-start'}
                                                    color={
                                                        colors.text.TEXT_PRIMARY
                                                    }
                                                    fontSize={[
                                                        'md',
                                                        'xl',
                                                        '2xl'
                                                    ]}
                                                    bold
                                                >
                                                    {transaction.recipientName}
                                                </Text>
                                                <Text
                                                    color={colors.neutral.GRAY}
                                                    alignItems={'flex-start'}
                                                    alignSelf={'flex-start'}
                                                    textAlign="center"
                                                    fontSize={[
                                                        'xs',
                                                        'md',
                                                        'lg'
                                                    ]}
                                                >
                                                    {transaction.atrId}
                                                    {' · '}
                                                    {new Date(
                                                        transaction.dateTime
                                                    ).getDay()}{' '}
                                                    {
                                                        monthNames[
                                                            new Date(
                                                                transaction.dateTime
                                                            ).getMonth()
                                                        ]
                                                    }{' '}
                                                    {' · '}
                                                    {new Date(
                                                        transaction.dateTime
                                                    ).getHours()}
                                                    :
                                                    {new Date(
                                                        transaction.dateTime
                                                    ).getMinutes()}{' '}
                                                    {new Date(
                                                        transaction.dateTime
                                                    ).getHours() >= 12
                                                        ? 'pm'
                                                        : 'am'}
                                                </Text>
                                            </VStack>
                                            <HStack
                                                h={'full'}
                                                w={'30%'}
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                            >
                                                <Text
                                                    fontSize={[
                                                        'lg',
                                                        '2xl',
                                                        '3xl'
                                                    ]}
                                                    color={
                                                        transaction.amount < 0
                                                            ? colors.text
                                                                  .TEXT_ERROR
                                                            : colors.text
                                                                  .TEXT_PRIMARY
                                                    }
                                                >
                                                    {transaction.curSymbol}{' '}
                                                    {Number(
                                                        transaction.amount
                                                    ).toFixed(2)}
                                                </Text>
                                            </HStack>
                                        </HStack>
                                    </Pressable>
                                )
                            )
                        ) : (
                            <Stack
                                rounded="xl"
                                bg={colors.primary.DARKSECOND}
                                w={'full'}
                                h={[20, 24, 32]}
                                mb={[3]}
                            >
                                <HStack
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    h={'full'}
                                    rounded="xl"
                                >
                                    <VStack
                                        h={'full'}
                                        w={['90%']}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <Text
                                            alignItems={'center'}
                                            alignSelf={'center'}
                                            color={colors.text.TEXT_WHITE}
                                            fontSize={['md', 'xl', '2xl']}
                                            bold
                                        >
                                            {t('no_transactions')}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Stack>
                        )}
                    </ScrollView>
                </VStack>
            </Stack>
        </Box>
    );
};

export default DashboardScreen;
