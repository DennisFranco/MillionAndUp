import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import SceneNames from '../../navigation/SceneNames';
import colors from '../../theme/colors';
import {icons} from '../../assets/images/icons';
import {useTranslation} from 'react-i18next';
import {Stack, Image, Text, Box, VStack, Spinner} from 'native-base';
import {fontFamily} from '../../theme';

type WelcomeSlideType = {
  key: string;
  title: string;
  image: any;
};

const WelcomeScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const onDone = () => navigate(SceneNames.SignInScreen);

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
    <Stack alignItems="center">
      <Image source={item.image} resizeMode="cover" alt="image" size={'full'} />
      <Stack w="full" mt={[16, 117, 137]} pl={[6, 8, 10]} position={'absolute'}>
        <Text
          color={colors.text.TEXT_WHITE}
          bold
          fontSize={['2xl', '3xl', '7xl']}
          fontFamily={fontFamily.PoppinsMedium}
          lineHeight="xs">
          {t(item.title)}
        </Text>
      </Stack>
    </Stack>
  );

  return (
    <Box backgroundColor={colors.primary.FIRST} flex={1}>
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
          backgroundColor: colors.primary.FIRST,
          width: 8,
          height: 8,
        }}
        dotStyle={{
          backgroundColor: colors.primary.FOURTH,
          width: 8,
          height: 8,
        }}
      />
    </Box>
  );
};

export default WelcomeScreen;

const slides: WelcomeSlideType[] = [
  {
    key: 's1',
    title: 'welcome_screen_title_1',
    image: icons.fondo1,
  },
  {
    key: 's2',
    title: 'welcome_screen_title_2',
    image: icons.fondo2,
  },
  {
    key: 's3',
    title: 'welcome_screen_title_3',
    image: icons.fondo3,
  },
];
