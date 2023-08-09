import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../../navigation/StackNavigationProp';
import SceneNames from '../../../navigation/SceneNames';
import {useTranslation} from 'react-i18next';
import colors from '../../../theme/colors';
import {useUserSweet} from '../../../services/context/useUserSweet';
import {GestureResponderEvent, Platform} from 'react-native';
import {useRequestContext} from '../../../services/context/RequestContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {RequestLogin} from '../../../services/AuthService';

const SignInScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [{userLoginData}, {setUserLoginData, setToken}] = useUserSweet();
  const [{}, {errorHandler, loadingHandler}] = useRequestContext();
  const [dataUsers, setDataUsers] = useState<any>([]);

  const initialValues = {
    email: 'usuario@mail.com',
    password: '123456',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(t('please_enter_your_email')),
    password: Yup.string().required(t('validate_password')),
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_User');
      if (value) {
        setDataUsers(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const token = () => {
    return Math.random().toString(36).substr(2);
  };

  return (
    <Box flex={1} safeArea bg={colors.neutral.WHITE}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values: any, {resetForm}) => {
          loadingHandler(true);
          if (dataUsers.length) {
            dataUsers.forEach((user: RequestLogin) => {
              if (
                user.email === values.email &&
                user.password === values.password
              ) {
                setUserLoginData(user);
                loadingHandler(false);
                setToken({
                  key: token(),
                });
              } else {
                resetForm({values: {email: '', password: ''}});
                errorHandler('Datos no coinciden');
              }
            });
          } else {
            resetForm({values: {email: '', password: ''}});
            errorHandler('Usuario no encontrado, Registrate');
          }
        }}>
        {formik => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
              <Center
                px={[6, 8, 10]}
                justifyContent={'center'}
                alignItems={'center'}>
                <Image
                  source={icons.mainIcon}
                  rounded={'2xl'}
                  alt="image"
                  w={[48, 56, 64]}
                  h={[48, 56, 64]}
                />
              </Center>
              <Center px={[6, 8, 10]} h={['xs', 'sm', 'md']}>
                <VStack space={5} alignItems={'center'} w={'full'}>
                  <FormControl isRequired w={'full'}>
                    <FormControl.Label>{t('email')}</FormControl.Label>
                    <Input
                      h={[53, 60, 70]}
                      rounded={'xl'}
                      keyboardType={'default'}
                      borderColor={colors.primary.FIRST}
                      fontSize={['sm', 'md', '2xl']}
                      value={formik.values.email}
                      onChangeText={formik.handleChange('email')}
                      bg={colors.neutral.WHITE}
                      borderWidth={[1, 2, 2]}
                    />
                    <Text
                      color={colors.text.TEXT_ERROR}
                      pb={[2, 4, 0]}
                      pl={[2, 4, 6]}
                      fontSize={['sm', 'md', 'xl']}>
                      {'email' in formik.errors
                        ? formik.errors.email?.toString()
                        : ''}
                    </Text>
                  </FormControl>

                  <FormControl isRequired w={'full'}>
                    <FormControl.Label>{t('password')}</FormControl.Label>
                    <Input
                      h={[53, 60, 70]}
                      rounded={'xl'}
                      keyboardType="numeric"
                      secureTextEntry
                      borderColor={colors.primary.FIRST}
                      fontSize={['sm', 'md', '2xl']}
                      value={formik.values.password}
                      onChangeText={formik.handleChange('password')}
                      bg={colors.neutral.WHITE}
                      borderWidth={[1, 2, 2]}
                    />
                    <Text
                      color={colors.text.TEXT_ERROR}
                      pb={[2, 4, 0]}
                      pl={[2, 4, 6]}
                      fontSize={['sm', 'md', 'xl']}>
                      {'password' in formik.errors
                        ? formik.errors.password?.toString()
                        : ''}
                    </Text>
                  </FormControl>
                </VStack>
              </Center>
              <Center px={[6, 8, 6]} h={[32, 40, 48]}>
                <Button
                  h={[12, 16, 20]}
                  w={'full'}
                  rounded={'xl'}
                  onPress={formik.handleSubmit as unknown as (e: GestureResponderEvent) => void}
                  _pressed={{
                    backgroundColor: colors.primary.SECOND,
                  }}
                  bg={colors.primary.FIRST}
                  _text={{
                    fontSize: ['sm', 'md', '2xl'],
                    color: colors.text.TEXT_WHITE,
                    textAlign: 'center',
                  }}>
                  {t('btn_login')}
                </Button>
                <Pressable
                  onPress={() => navigate(SceneNames.RegisterScreen)}
                  pt={[8, 10, 10]}>
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
              </Center>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </Box>
  );
};

export default SignInScreen;
