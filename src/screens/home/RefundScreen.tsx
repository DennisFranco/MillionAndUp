import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Text,
    Input,
    VStack,
    ScrollView,
    Button,
    Center,
    KeyboardAvoidingView,
    Image,
    Stack,
    FormControl
} from 'native-base';
import { icons } from '../../assets/images/icons';
import { useNavigation } from '@react-navigation/native';
import { GenericStackNavigationProp } from '../../navigation/StackNavigationProp';
import SceneNames from '../../navigation/SceneNames';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';
import { Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useUserSweet } from '../../services/context/useUserSweet';
import {
    TopNWalletTransactions,
    displayTransactionInfo
} from '../../services/DashboardService';
import { useRequestContext } from '../../services/context/RequestContext';
import { Spacer } from 'native-base';

const RefundScreen = () => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const { params } =
        useRoute<RouteProp<RootStackParamList, SceneNames.RefundScreen>>();
    const [{ userInformation, agencyInfo }] = useUserSweet();
    const ref = useRef(null);
    ref.current?.scrollToEnd({ animated: true });
    const [{}, { loadingHandler, errorHandler }] = useRequestContext();
    const [dataRefund, setDataRefund] = useState<TopNWalletTransactions>();

    useEffect(() => {
        loadingHandler(true);
        displayTransactionInfo(
            {
                agencyCode: agencyInfo.code,
                customerId: userInformation.identityCode,
                transactionID: params.atrId
            },
            (result) => {
                if (result.code === '1') {
                    loadingHandler(false);
                    setDataRefund(result.object_);
                } else {
                    errorHandler(result.description);
                }
            },
            errorHandler
        );
    }, []);

    const onPress = () => {
        loadingHandler(false);
        navigate(SceneNames.DashboardScreen);
    };

    return (
        <Box flex={1} bg={colors.neutral.WHITE}>
            <ScrollView>
                <Center px={[6, 10, 16]} py={[10, 12, 16]}>
                    <Stack
                        w={'full'}
                        rounded="xl"
                        bg={colors.neutral.WHITE}
                        shadow={7}
                        space={5}
                        pb={5}
                    >
                        <Stack
                            bg={colors.neutral.WHITE}
                            rounded={'full'}
                            borderColor={colors.neutral.WHITE}
                            w={[20, 24, 32]}
                            h={[20, 24, 32]}
                            mt={[-8, -9, -10]}
                            left={[9, 10, 12]}
                            shadow={6}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Image
                                source={icons.send}
                                alt="image"
                                h={[16, 20, 24]}
                                w={[16, 20, 24]}
                            />
                        </Stack>
                        <Stack space={5} alignItems="center">

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('to')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={dataRefund?.recipientName}
                                />
                            </FormControl>

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('phone_number')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={dataRefund?.bankAccountNumber}
                                />
                            </FormControl>

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('amount')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={
                                        userInformation.defaultCurrency +
                                        ' ' +
                                        dataRefund?.amount.slice(0, -2)
                                    }
                                />
                            </FormControl>

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('fees_text')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={
                                        userInformation.defaultCurrency +
                                        ' ' +
                                        dataRefund?.fee.slice(0, -2)
                                    }
                                />
                            </FormControl>

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('Total')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={
                                        userInformation.defaultCurrency +
                                        ' ' +
                                        dataRefund?.total.slice(0, -2)
                                    }
                                />
                            </FormControl>

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('date')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={dataRefund?.dateTime}
                                />
                            </FormControl>

                            <FormControl w={['90%']}>
                                <Text
                                    color={colors.primary.FIRST}
                                    fontSize={['sm', 'md', '3xl']}
                                >
                                    {t('amount_to_receive')}
                                </Text>
                                <Input
                                    bg={colors.neutral.WHITE}
                                    borderColor={colors.neutral.WHITE}
                                    borderBottomColor={colors.neutral.GRAY}
                                    borderBottomWidth={[1, 2, 2]}
                                    editable={false}
                                    w={'full'}
                                    h={[10, 12, 16]}
                                    fontSize={['sm', 'md', '2xl']}
                                    value={
                                        dataRefund?.currencyDestinatioCode +
                                        ' ' +
                                        dataRefund?.totalReceived.slice(0, -2)
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </Stack>
                </Center>
            </ScrollView>
            {/* @TODO: me parece que al ser informativo no deberia llevar boton
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Center px={[8, 10, 16]} h={[20, 24, 32]} bg={'amber.400'}>
                    <Button
                        h={[53, 60, 20]}
                        w={['full']}
                        rounded={'xl'}
                        onPress={onPress}
                        _pressed={{
                            backgroundColor: colors.primary.DARKFIRST
                        }}
                        bg={colors.primary.FIRST}
                        _text={{
                            fontSize: ['sm', 'md', '2xl'],
                            color: colors.text.TEXT_WHITE,
                            textAlign: 'center'
                        }}
                    >
                        {t('home')}
                    </Button>
                </Center>
            </KeyboardAvoidingView> */}
        </Box>
    );
};
export default RefundScreen;
