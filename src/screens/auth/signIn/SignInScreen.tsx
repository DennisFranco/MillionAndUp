import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Text,
  Image,
  HStack,
  Pressable,
  VStack,
  Button,
  FormControl,
  Input,
  ScrollView,
  Center,
  KeyboardAvoidingView,
} from 'native-base';
import {icons} from '../../../assets/images/icons';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../../navigation/StackNavigationProp';
import SceneNames from '../../../navigation/SceneNames';
import {useTranslation} from 'react-i18next';
import colors from '../../../theme/colors';
import {useUserSweet} from '../../../services/context/useUserSweet';
import {Alert, Platform} from 'react-native';
import {normalize, vh, vw} from '../../../theme/scale';
import {
  getPersist,
  useRequestContext,
} from '../../../services/context/RequestContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  customerFind,
  login,
  RequestLogin,
  loginGetToken,
  GeneralTokenResponse,
} from '../../../services/AuthService';

const SignInScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [
    {userLoginData},
    {
      setUserCoinBalance,
      setUserLoginData,
      setUserInformation,
      setToken,
      setAgencyInfo,
    },
  ] = useUserSweet();
  const [{}, {errorHandler, loadingHandler}] = useRequestContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countryCallingCode, setCountryCallingCode] = useState('1');
  const [countryCca2Code, setCountryCca2Code] = useState<any>('US');
  const [loading, setLoading] = useState(false);
  const [pressButton, setPressButton] = useState('signIn');
  const [isBiometrics, setIsBiometrics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const initialValues: RequestLogin = {
    phonePrefix: countryCallingCode,
    phoneNumber: '1234567894',
    secretCode: '1111',
    deviceID: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .min(7, t('please_number_length'))
      .max(10, t('number_length'))
      .required(t('validate_mobilePhone')),
    secretCode: Yup.string().required(t('validate_password')),
  });

  const change = (typeButton: string) => {
    setPressButton(typeButton);
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_User');
      setData(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: any) => {
    loadingHandler(true);
    setLoading(false);
  };

  return (
    <Box flex={1} safeArea bg={colors.neutral.WHITE}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}>
        {formik => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
              <Center px={[6, 8, 10]}>
                <HStack space={3} justifyContent="center" alignItems="center">
                  <Image source={icons.new_logo} alt="image" w={220} h={220} />
                </HStack>
              </Center>
              <Center px={[6, 8, 10]} h={['xs', 'sm', 'md']}>
                {isBiometrics ? (
                  <VStack
                    space={[10, 12, 16]}
                    alignItems="center"
                    w={'full'}
                    mt={[16, 20, 24]}>
                    <Pressable
                      alignItems="center"
                      onTouchStart={() => console.log('hola')}>
                      <Image
                        source={icons.face}
                        size={[24, 32, 40]}
                        alt="image"
                      />
                      <Text
                        color={colors.primary.FIRST}
                        mt={[5, 7, 10]}
                        fontSize={['sm', 'md', '2xl']}>
                        {t('face_login')}
                      </Text>
                    </Pressable>
                    <Text
                      fontSize={['sm', 'md', '2xl']}
                      color={colors.primary.FIRST}>
                      {t('or')}
                    </Text>
                  </VStack>
                ) : (
                  <VStack space={5} alignItems="center" w={'full'}>
                    {!data?.phoneNumber && (
                      <FormControl isRequired w={'full'}>
                        <Input
                          h={[53, 60, 70]}
                          rounded={'xl'}
                          keyboardType="numeric"
                          borderColor={colors.primary.FIRST}
                          placeholder={t('phone_number')}
                          fontSize={['sm', 'md', '2xl']}
                          value={formik.values.phoneNumber}
                          onChangeText={formik.handleChange('phoneNumber')}
                          bg={colors.neutral.WHITE}
                          borderWidth={[1, 2, 2]}
                        />
                        <Text
                          color={colors.text.TEXT_ERROR}
                          pb={[2, 4, 0]}
                          pl={[2, 4, 6]}
                          fontSize={['sm', 'md', 'xl']}>
                          {'phoneNumber' in formik.errors
                            ? formik.errors.phoneNumber
                            : ''}
                        </Text>
                      </FormControl>
                    )}

                    {data?.phoneNumber && (
                      <Pressable
                        onPress={() => {
                          setData(''); //usual call like vanilla javascript, but uses this operator
                        }}>
                        <Text
                          color={colors.primary.FIRST}
                          bold
                          fontSize={['sm', 'md', '2xl']}
                          pb={[2, 2, 10]}>
                          {t('sign_in_with_another_user')}
                        </Text>
                      </Pressable>
                    )}
                  </VStack>
                )}
              </Center>
              <Center px={[6, 8, 6]} h={[32, 40, 48]}>
                <Button
                  h={[12, 16, 20]}
                  w={'full'}
                  rounded={'xl'}
                  onPress={
                    pressButton == 'signIn'
                      ? isBiometrics
                        ? () => setIsBiometrics(false)
                        : formik.handleSubmit
                      : () => navigate(SceneNames.RegisterScreen)
                  }
                  // onPress={() =>
                  //     navigate(SceneNames.DashboardScreen)
                  // }
                  _pressed={{
                    backgroundColor: colors.primary.DARKFIRST,
                  }}
                  bg={colors.primary.FIRST}
                  isLoading={loading}
                  _text={{
                    fontSize: ['sm', 'md', '2xl'],
                    color: colors.text.TEXT_WHITE,
                    textAlign: 'center',
                  }}>
                  {pressButton == 'signIn'
                    ? isBiometrics
                      ? t('login_with_your_ping')
                      : t('sign_in')
                    : t('lets_begin')}
                </Button>
                <Pressable
                  onPress={
                    pressButton == 'signIn'
                      ? () => change('signUp')
                      : () => change('signIn')
                  }
                  pt={[8, 10, 10]}>
                  {pressButton == 'signIn' ? (
                    isBiometrics ? (
                      <Text
                        color={colors.neutral.GRAY_LIGHT}
                        fontSize={['sm', 'md', '2xl']}>
                        {t('dont_have_an_account')}{' '}
                        <Text
                          color={colors.primary.FIRST}
                          bold
                          fontSize={['sm', 'md', 'lg']}>
                          {t('sign_up')}
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        color={colors.primary.FIRST}
                        bold
                        fontSize={['sm', 'md', '2xl']}
                        pb={[2, 2, 10]}>
                        {t('forgot_pin')}
                      </Text>
                    )
                  ) : (
                    <Text
                      color={colors.neutral.GRAY_LIGHT}
                      fontSize={['sm', 'md', '2xl']}
                      pb={[2, 2, 10]}>
                      {t('have_an_account')}{' '}
                      <Text
                        color={colors.primary.FIRST}
                        bold
                        fontSize={['sm', 'md', 'xl']}>
                        {t('sign_in')}
                      </Text>
                    </Text>
                  )}
                </Pressable>
              </Center>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </Box>
  );
};

export default SignInScreen;
