import React, {useEffect, useRef, useState} from 'react';
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
  Checkbox,
  HStack,
  Image,
  IconButton,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../../navigation/StackNavigationProp';
import SceneNames from '../../../navigation/SceneNames';
import {useTranslation} from 'react-i18next';
import colors from '../../../theme/colors';
import {
  Platform,
  Linking,
  Alert,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {icons} from '../../../assets/images/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../../theme/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserSweet} from '../../../services/context/useUserSweet';
import {RequestLogin} from '../../../services/AuthService';
import {useRequestContext} from '../../../services/context/RequestContext';
import InputElement from '../../../componentes/inputs/InputElement';

const RegisterScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [{userLoginData}, {setUserLoginData, setToken}] = useUserSweet();
  const [{}, {errorHandler, loadingHandler}] = useRequestContext();
  const ref = useRef(null);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [dataUsers, setDataUsers] = useState<any>([]);

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

  const initialValues = {
    name: 'Usuario Prueba',
    email: 'usuario@mail.com',
    password: '123456',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('please_enter_your_name')),
    email: Yup.string().email().required(t('please_enter_your_email')),
    password: Yup.string().required(t('validate_password')),
  });

  const onSubmit = async (values: any) => {
    if (checked === false) {
      Alert.alert('Error', t('please_accept_terms_and_conditions'));
    } else {
      loadingHandler(true);
      if (dataUsers.lenght) {
        dataUsers.forEach(async (user: RequestLogin) => {
          if (user.email === values.email) {
            errorHandler('usuario ya existe');
          } else {
            addUser(values);
          }
        });
      } else {
        addUser(values);
      }
      loadingHandler(false);
    }
  };

  const addUser = async (values: any) => {
    await AsyncStorage.removeItem('@storage_User');
    dataUsers.push(values);
    await AsyncStorage.setItem('@storage_User', JSON.stringify(dataUsers));
    setUserLoginData(values);
    setToken({
      key: Math.random().toString(36).substr(2),
    });
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
          <>
            <ScrollView ref={ref}>
              <Center
                px={[6, 8, 10]}
                justifyContent={'center'}
                alignItems={'center'}>
                <Image
                  source={icons.mainIcon}
                  rounded={'2xl'}
                  alt="image"
                  size={24}
                />
              </Center>
              <Center px={[6, 8, 10]} h={['full']}>
                <VStack alignItems={'center'} w={['full', 'lg', '2xl']}>
                  <InputElement
                    title={t('name')}
                    value={formik.values.email}
                    onChangeText={formik.handleChange('name')}
                    errors={
                      'name' in formik.errors
                        ? formik.errors.name?.toString()
                        : ''
                    }
                  />

                  <InputElement
                    title={t('email')}
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    errors={
                      'email' in formik.errors
                        ? formik.errors.email?.toString()
                        : ''
                    }
                  />

                  <InputElement
                    title={t('password')}
                    value={formik.values.email}
                    onChangeText={formik.handleChange('password')}
                    errors={
                      'password' in formik.errors
                        ? formik.errors.password?.toString()
                        : ''
                    }
                  />
                  
                  <HStack
                    w={'full'}
                    space={10}
                    justifyContent="flex-start"
                    alignItems={'center'}>
                    <Checkbox
                      value={'checked'}
                      accessibilityLabel={'checked'}
                      colorScheme={'blue'}
                      isChecked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <Text
                      onPress={() => Linking.openURL('https://es.lipsum.com/')}
                      bold
                      color={colors.primary.FIRST}
                      fontSize={['md', 'lg', '2xl']}
                      textDecorationLine={'underline'}>
                      {t('term_and_conditions')}
                    </Text>
                  </HStack>
                </VStack>
              </Center>
            </ScrollView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Center px={[6, 8, 10]} h={[40, 48, 56]}>
                <Button
                  h={[53, 60, 20]}
                  w={['full', 'lg', '2xl']}
                  rounded={'xl'}
                  onPress={
                    formik.handleSubmit as unknown as (
                      e: GestureResponderEvent,
                    ) => void
                  }
                  _pressed={{
                    backgroundColor: colors.primary.SECOND,
                  }}
                  bg={colors.primary.FIRST}
                  _text={{
                    fontSize: ['sm', 'md', '2xl'],
                    color: colors.text.TEXT_WHITE,
                    textAlign: 'center',
                  }}>
                  {t('next')}
                </Button>
                <Pressable onPress={() => navigate(SceneNames.SignInScreen)}>
                  <Text
                    color={colors.neutral.GRAY_LIGHT}
                    fontSize={['sm', 'md', '2xl']}
                    pt={[5, 5, 10]}>
                    {t('have_an_account')}{' '}
                    <Text
                      color={colors.primary.FIRST}
                      bold
                      fontSize={['sm', 'md', 'xl']}>
                      {t('btn_login')}
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
