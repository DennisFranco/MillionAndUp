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
                  <FormControl>
                    <Text
                      fontSize={['sm', 'md', '2xl']}
                      color={colors.text.TEXT_GRAY}>
                      {t('name')}
                    </Text>
                    <Input
                      h={[53, 60, 68]}
                      rounded="xl"
                      w={'full'}
                      fontSize={['sm', 'md', '2xl']}
                      bg={colors.neutral.WHITE}
                      borderWidth={[1, 2, 2]}
                      borderColor={colors.primary.FIRST}
                      value={formik.values.name}
                      onChangeText={formik.handleChange('name')}
                    />
                    <Text
                      color={colors.text.TEXT_ERROR}
                      mb={[2, 4, 6]}
                      ml={[2, 4, 6]}
                      fontSize={['sm', 'md', '2xl']}>
                      {'name' in formik.errors ? formik.errors.name : ''}
                    </Text>
                  </FormControl>
                  <FormControl>
                    <Text
                      fontSize={['sm', 'md', '2xl']}
                      color={colors.text.TEXT_GRAY}>
                      {t('email')}
                    </Text>

                    <Input
                      h={[53, 60, 68]}
                      rounded="xl"
                      w={'full'}
                      fontSize={['sm', 'md', '2xl']}
                      borderWidth={[1, 2, 2]}
                      bg={colors.neutral.WHITE}
                      borderColor={colors.primary.FIRST}
                      value={formik.values.email}
                      onChangeText={formik.handleChange('email')}
                    />
                    <Text
                      color={colors.text.TEXT_ERROR}
                      mb={[2, 4, 6]}
                      ml={[2, 4, 6]}
                      fontSize={['sm', 'md', '2xl']}>
                      {'email' in formik.errors ? formik.errors.email : ''}
                    </Text>
                  </FormControl>
                  <FormControl>
                    <Text
                      fontSize={['sm', 'md', '2xl']}
                      color={colors.text.TEXT_GRAY}>
                      {t('password')}
                    </Text>
                    <Input
                      type={show ? 'text' : 'password'}
                      h={[53, 60, 68]}
                      rounded="xl"
                      borderWidth={[1, 2, 2]}
                      w={'full'}
                      fontSize={['sm', 'md', '2xl']}
                      bg={colors.neutral.WHITE}
                      borderColor={colors.primary.FIRST}
                      InputRightElement={
                        <IconButton
                          colorScheme="blue"
                          icon={
                            show ? (
                              <Ionicons
                                name={'eye'}
                                size={normalize(20)}
                                color={colors.primary.FIRST}
                                style={{
                                  marginLeft: normalize(10),
                                }}
                              />
                            ) : (
                              <Ionicons
                                name={'eye-off'}
                                size={normalize(20)}
                                color={colors.primary.FIRST}
                                style={{
                                  marginLeft: normalize(10),
                                }}
                              />
                            )
                          }
                          pr={3}
                          p={0}
                          onPress={handleClick}
                        />
                      }
                      value={formik.values.password}
                      onChangeText={formik.handleChange('password')}
                    />
                    <Text
                      color={colors.text.TEXT_ERROR}
                      mb={[2, 4, 6]}
                      ml={[2, 4, 6]}
                      fontSize={['sm', 'md', '2xl']}>
                      {'password' in formik.errors
                        ? formik.errors.password
                        : ''}
                    </Text>
                  </FormControl>
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
