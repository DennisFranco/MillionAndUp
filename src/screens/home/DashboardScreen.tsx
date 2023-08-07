import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
  Icon,
} from 'native-base';
import {icons} from '../../assets/images/icons';
import {useRequestContext} from '../../services/context/RequestContext';
import {useUserSweet} from '../../services/context/useUserSweet';
import SceneNames from '../../navigation/SceneNames';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import {useNavigation} from '@react-navigation/native';
import {
  GlobalCryptoData,
  dataTickers,
  getTickers,
  getbodyGlobalCryptoData,
} from '../../services/DashboardService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RefreshControl} from 'react-native';
import {normalize} from '../../theme/scale';

Ionicons.loadFont();
const DashboardScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const navigation = useNavigation<GenericStackNavigationProp>();
  const [{}, {loadingHandler, errorHandler}] = useRequestContext();
  const [{token}] = useUserSweet();
  const [refreshing, setRefreshing] = useState(false);
  const [dataGlobalCryptoData, setDataGlobalCryptoData] =
    useState<GlobalCryptoData>();

  const [dataTickers, setDataTickers] = useState<dataTickers[]>();

  useEffect(() => {
    loadingHandler(true);
    apis();
  }, []);

  const apis = () => {
    loadingHandler(true);
    getbodyGlobalCryptoData(
      {},
      (result: any) => {
        setDataGlobalCryptoData(result.object_);
      },
      errorHandler,
    );
    getTickers(
      {
        start: 0,
        limit: 5,
      },
      (result: any) => {
        setDataTickers(result.data);
        loadingHandler(false);
      },
      errorHandler,
    );
  };

  const initial = () => {
    apis();
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

  return (
    <Box flex={1} bg={colors.neutral.WHITE} safeArea>
      <Stack px={[6, 8, 10]} h={['full', 'full', 'full']} space={[2, 8, 12]}>
        <HStack
          h={[20, 24, 32]}
          w={'full'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <VStack>
            <Text fontSize={['md', 'lg', 'xl']} color={colors.text.TEXT_GRAY}>
              {t('regards')}
              {', '}
            </Text>
            <Text fontSize={['md', 'lg', 'xl']} color={colors.text.TEXT_GRAY}>
              {t('question_dashboard')}
            </Text>
          </VStack>
          <Pressable
            onPress={() => navigate(SceneNames.MenuSettings)}
            bg={colors.primary.FIRST}
            _pressed={{
              bg: colors.primary.FIRST,
            }}
            w={[10, 12, 16]}
            h={[10, 12, 16]}
            rounded={'xl'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Ionicons
              name={'settings-sharp'}
              size={normalize(20)}
              color={colors.neutral.WHITE}
            />
          </Pressable>
        </HStack>

        <HStack
          justifyContent={'center'}
          alignItems={'center'}
          w={'full'}
          h={[56, 64, 72]}
          bg={colors.primary.FIRST}
          rounded={'xl'}
          shadow={9}>
          <Button
            h={[53, 60, 20]}
            onPress={() => navigate(SceneNames.DashboardScreen)}
            w={['50%']}
            rounded={'xl'}
            _pressed={{
              backgroundColor: colors.primary.SECOND,
            }}
            bg={colors.primary.SECOND}
            p={0}
            shadow={9}>
            <HStack
              alignItems={'center'}
              justifyContent={'center'}
              h={'full'}
              w={[40, 48, 56]}
              rounded={'xl'}>
              <Stack
                h={'full'}
                w="20%"
                alignItems={'center'}
                justifyContent={'center'}>
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
                alignItems={'center'}>
                <Text
                  alignItems={'flex-start'}
                  alignSelf={'flex-start'}
                  color={colors.text.TEXT_WHITE}
                  fontSize={['sm', 'lg', '2xl']}>
                  {t('send')}
                </Text>
              </VStack>
            </HStack>
          </Button>
        </HStack>

        <VStack h={['sm', 'md', 'lg']} w={'full'}>
          <HStack justifyContent={'space-between'}>
            <Text
              fontSize={['md', 'xl', '2xl']}
              color={colors.text.TEXT_BLACK}
              bold
              mb={[5]}>
              {t('ranking_tickers')}
            </Text>

            <Pressable
              onPress={() => navigate(SceneNames.MenuSettings)}
              bg={colors.neutral.WHITE}
              h={[10, 12, 16]}
              rounded={'xl'}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text
                fontSize={['md', 'xl', '2xl']}
                color={colors.text.TEXT_BLACK}
                bold
                mb={[5]}>
                {t('view_more')}
              </Text>
            </Pressable>
          </HStack>

          <ScrollView
            disableScrollViewPanResponder={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {dataTickers ? (
              dataTickers.map((ticker: any, index: any) => (
                <Pressable
                  onPress={() =>
                    navigate(SceneNames.DetailsScreen, {id: ticker.id})
                  }
                  rounded="xl"
                  bg={colors.neutral.GRAY_THIRD}
                  w={'full'}
                  h={[20, 24, 32]}
                  mb={[3]}
                  key={index}>
                  <HStack
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'full'}
                    rounded="xl">
                    <Stack
                      h={'full'}
                      w="20%"
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Image
                        source={icons.mainIcon}
                        alt="image"
                        size={[12, 16, 20]}
                        rounded={'xl'}
                      />
                    </Stack>
                    <VStack
                      h={'full'}
                      w={['30%']}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Text
                        alignItems={'flex-start'}
                        alignSelf={'flex-start'}
                        color={colors.text.TEXT_PRIMARY}
                        fontSize={['md', 'xl', '2xl']}
                        bold>
                        {ticker.name}
                      </Text>
                      <Text
                        color={colors.neutral.GRAY}
                        alignItems={'flex-start'}
                        alignSelf={'flex-start'}
                        textAlign="center"
                        fontSize={['xs', 'md', 'lg']}>
                        {ticker.symbol}
                      </Text>
                    </VStack>
                    <HStack
                      h={'full'}
                      w={'30%'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Text
                        fontSize={['lg', '2xl', '3xl']}
                        color={
                          ticker.amount < 0
                            ? colors.text.TEXT_ERROR
                            : colors.text.TEXT_PRIMARY
                        }>
                        {'$ '}
                        {Number(ticker.price_usd).toFixed(2)}
                      </Text>
                    </HStack>
                    <Stack
                      h={'full'}
                      w={'20%'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Ionicons
                        name={'caret-forward'}
                        size={normalize(20)}
                        color={colors.primary.FIRST}
                      />
                    </Stack>
                  </HStack>
                </Pressable>
              ))
            ) : (
              <Stack
                rounded="xl"
                bg={colors.primary.SECOND}
                w={'full'}
                h={[20, 24, 32]}
                mb={[3]}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'center'}
                  h={'full'}
                  rounded="xl">
                  <VStack
                    h={'full'}
                    w={['90%']}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <Text
                      alignItems={'center'}
                      alignSelf={'center'}
                      color={colors.text.TEXT_WHITE}
                      fontSize={['md', 'xl', '2xl']}
                      bold>
                      {t('no_tickers')}
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
