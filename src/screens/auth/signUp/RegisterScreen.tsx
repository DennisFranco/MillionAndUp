import React, { useRef } from 'react';
import {
    Box,
    Text,
    Button,
    VStack,
    FormControl,
    Input,
    ScrollView,
    Center,
    KeyboardAvoidingView,
    View,
    Checkbox,
    HStack
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { GenericStackNavigationProp } from '../../../navigation/StackNavigationProp';
import SceneNames from '../../../navigation/SceneNames';
import { useTranslation } from 'react-i18next';
import colors from '../../../theme/colors';
import { Platform, Linking, Alert, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterScreen = () => {
    const { t } = useTranslation();
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const ref = useRef(null);
    const [checked, setChecked] = React.useState(false);
    const initialValues = {
        fName: '',
        mname: '',
        lName: '',
        slName: ''
    };

    const validationSchema = Yup.object().shape({
            fName: Yup.string().required(t('please_enter_your_first_name')),
            mname: Yup.string(),
            lName: Yup.string().required(t('please_enter_your_last_name')),
            slName: Yup.string()
    });

    const onSubmit = async (values: any) => {
        if (checked === false) {
            Alert.alert(t('error'), t('please_accept_terms_and_conditions'));
        } else {
            navigate(SceneNames.DashboardScreen);
        }
    };

    return (
        <Box flex={1} safeArea bg={colors.neutral.WHITE}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <>
                        <ScrollView ref={ref}>
                            <Center px={[6, 8, 10]} h={['full']}>
                                <VStack
                                    space={10}
                                    alignItems="center"
                                    w={['full', 'lg', '2xl']}
                                    mt={[10, 12, 16]}
                                >
                                    <Input
                                        rounded={'xl'}
                                        editable={false}
                                        h={[20, 20, 32]}
                                        w={'full'}
                                        fontSize={['md', 'xl', '3xl']}
                                        color={colors.primary.FIRST}
                                        bg={colors.neutral.WHITE}
                                        borderColor={colors.primary.FIRST}
                                        borderWidth={[1, 2, 2]}
                                        InputLeftElement={
                                            <View
                                                mx={[5, 7, 7]}
                                                h={[12, 12, 16]}
                                                w={[12, 12, 16]}
                                                rounded={'full'}
                                                bg={colors.primary.FIRST}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Text
                                                    color={colors.neutral.WHITE}
                                                    fontSize={[12, 16, '3xl']}
                                                >
                                                    1
                                                </Text>
                                            </View>
                                        }
                                        value={t('enter_your_name')}
                                    />
                                    <Center w={'full'} mt={[1, 1, 18]}>
                                        <FormControl>
                                            <Text
                                                fontSize={['sm', 'md', '2xl']}
                                                color={colors.text.TEXT_GRAY}
                                            >
                                                {t('first_name')}
                                            </Text>
                                            <Input
                                                h={[53, 60, 68]}
                                                rounded="xl"
                                                w={'full'}
                                                fontSize={['sm', 'md', '2xl']}
                                                bg={colors.neutral.WHITE}
                                                borderWidth={[1, 2, 2]}
                                                borderColor={
                                                    colors.primary.FIRST
                                                }
                                                value={formik.values.fName}
                                                onChangeText={formik.handleChange(
                                                    'fName'
                                                )}
                                            />
                                            <Text
                                                color={colors.text.TEXT_ERROR}
                                                mb={[2, 4, 6]}
                                                ml={[2, 4, 6]}
                                                fontSize={['sm', 'md', '2xl']}
                                            >
                                                {'fName' in formik.errors
                                                    ? formik.errors.fName
                                                    : ''}
                                            </Text>
                                        </FormControl>
                                        <FormControl>
                                            <Text
                                                fontSize={['sm', 'md', '2xl']}
                                                color={colors.text.TEXT_GRAY}
                                            >
                                                {t('middle_name')}
                                            </Text>

                                            <Input
                                                h={[53, 60, 68]}
                                                rounded="xl"
                                                w={'full'}
                                                fontSize={['sm', 'md', '2xl']}
                                                borderWidth={[1, 2, 2]}
                                                bg={colors.neutral.WHITE}
                                                borderColor={
                                                    colors.primary.FIRST
                                                }
                                                value={formik.values.mname}
                                                onChangeText={formik.handleChange(
                                                    'mname'
                                                )}
                                            />
                                            <Text
                                                color={colors.text.TEXT_ERROR}
                                                mb={[2, 4, 6]}
                                                ml={[2, 4, 6]}
                                                fontSize={['sm', 'md', '2xl']}
                                            >
                                                {'mname' in formik.errors
                                                    ? formik.errors.mname
                                                    : ''}
                                            </Text>
                                        </FormControl>
                                        <FormControl>
                                            <Text
                                                fontSize={['sm', 'md', '2xl']}
                                                color={colors.text.TEXT_GRAY}
                                            >
                                                {t('last_name')}
                                            </Text>
                                            <Input
                                                h={[53, 60, 68]}
                                                rounded="xl"
                                                borderWidth={[1, 2, 2]}
                                                w={'full'}
                                                fontSize={['sm', 'md', '2xl']}
                                                bg={colors.neutral.WHITE}
                                                borderColor={
                                                    colors.primary.FIRST
                                                }
                                                value={formik.values.lName}
                                                onChangeText={formik.handleChange(
                                                    'lName'
                                                )}
                                            />
                                            <Text
                                                color={colors.text.TEXT_ERROR}
                                                mb={[2, 4, 6]}
                                                ml={[2, 4, 6]}
                                                fontSize={['sm', 'md', '2xl']}
                                            >
                                                {'lName' in formik.errors
                                                    ? formik.errors.lName
                                                    : ''}
                                            </Text>
                                        </FormControl>
                                        <HStack
                                            w={'full'}
                                            space={10}
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            <Checkbox
                                                value={'checked'}
                                                accessibilityLabel={'checked'}
                                                colorScheme={'green'}
                                                isChecked={checked}
                                                onChange={() =>
                                                    setChecked(!checked)
                                                }
                                            />
                                            <Text
                                                onPress={() =>
                                                    Linking.openURL(
                                                        'https://www.sikacash.com/home/LicenseandAgreement'
                                                    )
                                                }
                                                bold
                                                color={colors.primary.FIRST}
                                                fontSize={['md', 'lg', '2xl']}
                                                textDecorationLine={'underline'}
                                            >
                                                {t('terms_and_conditions')}
                                            </Text>
                                        </HStack>
                                    </Center>
                                </VStack>
                            </Center>
                        </ScrollView>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : 'height'
                            }
                        >
                            <Center px={[6, 8, 10]} h={[40, 48, 56]}>
                                <Button
                                    h={[53, 60, 20]}
                                    w={['full', 'lg', '2xl']}
                                    rounded={'xl'}
                                    onPress={formik.handleSubmit}
                                    _pressed={{
                                        backgroundColor:
                                            colors.primary.DARKFIRST
                                    }}
                                    bg={colors.primary.FIRST}
                                    _text={{
                                        fontSize: ['sm', 'md', '2xl'],
                                        color: colors.text.TEXT_WHITE,
                                        textAlign: 'center'
                                    }}
                                >
                                    {t('next')}
                                </Button>
                                <Pressable
                                    onPress={() =>
                                        navigate(SceneNames.SignInScreen)
                                    }
                                >
                                    <Text
                                        color={colors.neutral.GRAY_LIGHT}
                                        fontSize={['sm', 'md', '2xl']}
                                        pt={[5, 5, 10]}
                                    >
                                        {t('have_an_account')}{' '}
                                        <Text
                                            color={colors.primary.FIRST}
                                            bold
                                            fontSize={['sm', 'md', 'xl']}
                                        >
                                            {t('sign_in')}
                                        </Text>
                                    </Text>
                                </Pressable>
                            </Center>
                        </KeyboardAvoidingView>
                    </>
                )}
            </Formik>
        </Box>
    );
};

export default RegisterScreen;
