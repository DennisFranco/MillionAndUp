import React, {useEffect, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import SceneNames from '../../navigation/SceneNames';
import colors from '../../theme/colors';
import {icons} from '../../assets/images/icons';
import {useTranslation} from 'react-i18next';
import {Stack, Image, Text, Box, VStack, Spinner} from 'native-base';
import {fontFamily} from '../../theme';
import {getPersist, persist} from '../../services/context/RequestContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

type WelcomeSlideType = {
  key: string;
  title: string;
  subtitle: string;
  image: any;
};

const WelcomeScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<GenericStackNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const onDone = () => navigation.navigate(SceneNames.SignInScreen);
  const {navigate} = useNavigation<GenericStackNavigationProp>();

  // useEffect(() => {
  //     validateScreen();
  // }, []);

  // const validateScreen = () => {
  //     setIsLoading(true);
  //     getPersist('hasFirstLaunched').then((exist) => {
  //         exist === null
  //             ? persist('true', 'hasFirstLaunched') && setIsLoading(false)
  //             : setTimeout(() => {
  //                   navigate(SceneNames.SignInScreen);
  //               }, 1000);
  //     });
  //     return true;
  // };

  const _renderNextButton = () => (
    <Stack
      w={['full']}
      px={5}
      h={12}
      rounded="14"
      justifyContent="center"
      alignItems="center">
      <Text color={colors.text.TEXT_SECOND} fontSize={['sm', 'xl', '2xl']}>
        {t('next')}
      </Text>
    </Stack>
  );

  const _renderDoneButton = () => (
    <Stack
      w={'full'}
      h={'full'}
      py={[2, 10.4, 19.5]}
      px={[6, 8, 16]}
      bg={colors.primary.FOURTH}
      rounded={['md', 18, 32]}
      justifyContent="center"
      alignItems="center">
      <Text color={colors.text.TEXT_PRIMARY} fontSize={['sm', 'xl', '2xl']}>
        {t('get_started')}
      </Text>
    </Stack>
  );

  const _renderSkipButton = () => (
    <Stack
      w={['full']}
      px={5}
      h={12}
      rounded="14"
      justifyContent="center"
      alignItems="center">
      <Text color={colors.text.TEXT_SECOND} fontSize={['sm', 'xl', '2xl']}>
        {t('skip')}
      </Text>
    </Stack>
  );

  const _renderPrevButton = () => (
    <Stack
      h="12"
      w="16"
      rounded="14"
      justifyContent="center"
      alignItems="center">
      <Text color={colors.text.TEXT_SECOND} fontSize={['sm', 'xl', '2xl']}>
        {t('back')}
      </Text>
    </Stack>
  );

  const RenderItem = ({item}: {item: WelcomeSlideType}) => (
    <>
      <Stack mt={16} alignItems="flex-start">
        <Image
          source={item.image}
          resizeMode="contain"
          alt="image"
          h={[165, 265, 365]}
          w={[143, 243, 343]}
        />
      </Stack>
      <Stack alignItems="center">
        <Stack w="full" mt={[16, 117, 137]} pl={[6, 8, 10]}>
          <Text
            color={colors.text.TEXT_WHITE}
            bold
            fontSize={['2xl', '3xl', '7xl']}
            fontFamily={fontFamily.PoppinsMedium}
            lineHeight="xs">
            {t(item.title)}
          </Text>
          <Text
            color={colors.text.TEXT_SECOND}
            fontWeight="semibold"
            fontSize={['sm', 'xl', '3xl']}
            fontFamily={fontFamily.PoppinsMedium}
            lineHeight={'md'}
            mt={8}>
            {t(item.subtitle)}
          </Text>
        </Stack>
      </Stack>
    </>
  );

  return (
    <>
      {isLoading ? (
        <Box
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors.primary.FIRST}
          h="full">
          <VStack space={8} justifyContent="center" alignItems="center">
            <Image
              resizeMode="contain"
              size={[20, 24, 40]}
              source={icons.mainIcon}
              alt="logo"
            />
            <Spinner size="lg" color={colors.primary.SECOND} />
          </VStack>
        </Box>
      ) : (
        <Box
          w="full"
          h="full"
          bg={colors.primary.SECOND}
          safeArea
          pb={[0, 10, 30]}>
          <AppIntroSlider
            data={slides}
            renderItem={RenderItem}
            onDone={onDone}
            showSkipButton={true}
            showNextButton={true}
            showPrevButton={true}
            renderNextButton={_renderNextButton}
            renderDoneButton={_renderDoneButton}
            renderSkipButton={_renderSkipButton}
            renderPrevButton={_renderPrevButton}
            doneLabel={'Listo'}
            onSkip={onDone}
            activeDotStyle={{
              backgroundColor: colors.primary.SECOND,
              width: 5,
              height: 5,
              marginBottom: -30,
            }}
            dotStyle={{
              backgroundColor: colors.primary.THIRD,
              width: 5,
              height: 5,
              marginBottom: -30,
            }}
          />
        </Box>
      )}
    </>
  );
};

export default WelcomeScreen;

const slides: WelcomeSlideType[] = [
  {
    key: 's1',
    title: 'transfers_secured',
    subtitle: 'transfers_secured2',
    image: icons.fondo1,
  },
  {
    key: 's2',
    title: 'make_payments',
    subtitle: 'fasted_payments',
    image: icons.fondo2,
  },
  {
    key: 's3',
    title: 'buy_credits',
    subtitle: 'stay_in_touch',
    image: icons.fondo3,
  },
];
