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
  Divider,
  FlatList,
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
import {Dimensions, RefreshControl} from 'react-native';
import {normalize, vh} from '../../theme/scale';

Ionicons.loadFont();
const DashboardScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const navigation = useNavigation<GenericStackNavigationProp>();
  const [{}, {loadingHandler, errorHandler}] = useRequestContext();
  const [{userLoginData}] = useUserSweet();
  const [refreshing, setRefreshing] = useState(false);
  const [dataGlobalCryptoData, setDataGlobalCryptoData] =
    useState<GlobalCryptoData>();

  const [dataTickers, setDataTickers] = useState<dataTickers[]>();

  const services = [
    {
      id: 1,
      image: 'logo-bitcoin',
      text: 'coins_count',
      info: dataGlobalCryptoData ? dataGlobalCryptoData.coins_count : 0,
    },
    {
      id: 2,
      image: 'power-sharp',
      text: 'active_markets',
      info: dataGlobalCryptoData ? dataGlobalCryptoData.active_markets : 0,
    },
    {
      id: 3,
      image: 'stats-chart-sharp',
      text: 'total_mcap',
      info: dataGlobalCryptoData
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(dataGlobalCryptoData.total_mcap)
        : 0,
    },
    {
      id: 4,
      image: 'wallet-sharp',
      text: 'total_volume',
      info: dataGlobalCryptoData
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            maximumFractionDigits: 0,
            currency: 'USD',
          }).format(dataGlobalCryptoData.total_volume)
        : 0,
    },
  ];

  useEffect(() => {
    loadingHandler(true);
    apis();
  }, []);

  const apis = () => {
    loadingHandler(true);
    getbodyGlobalCryptoData(
      {},
      (result: any) => {
        setDataGlobalCryptoData(result[0]);
      },
      errorHandler,
    );
    getTickers(
      {
        start: 0,
        limit: 3,
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

  const renderButtonItem = (item: any, index: any) => (
    <Pressable
      key={index}
      h={[32, 40, 48]}
      w={[48, 56, 64]}
      alignItems={'center'}
      justifyContent={'center'}
      borderX={'turquoise'}>
      <Stack h={'50%'} justifyContent={'center'}>
        <Ionicons
          name={item.image}
          size={normalize(40)}
          color={colors.neutral.WHITE}
        />
      </Stack>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        h={'40%'}
        w={'100%'}>
        <Text
          fontSize={['sm', 'lg', 'xl']}
          color={colors.text.TEXT_WHITE}
          textAlign={'center'}>
          {t(item.text)}
        </Text>
        <Text
          fontSize={['sm', 'lg', 'xl']}
          color={colors.text.TEXT_WHITE}
          textAlign={'center'}
          bold>
          {item.info}
        </Text>
      </Stack>
      {services.length % 2 == 0 ? (
        item.id < services.length - 1 || item.id > services.length ? (
          <Divider
            bg={colors.neutral.WHITE}
            thickness={1}
            position={'absolute'}
            bottom={0}
            w={'90%'}
            orientation="horizontal"
          />
        ) : null
      ) : (
        <Divider
          bg={colors.neutral.WHITE}
          thickness={1}
          position={'absolute'}
          bottom={0}
          w={'90%'}
          orientation="horizontal"
        />
      )}
      {item.id % 2 ? (
        <Divider
          bg={colors.neutral.WHITE}
          thickness={1.5}
          position={'absolute'}
          right={0}
          h={'90%'}
          orientation="vertical"
        />
      ) : null}
    </Pressable>
  );

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
              {userLoginData?.name}
            </Text>
            <Text fontSize={['md', 'lg', 'xl']} color={colors.text.TEXT_GRAY}>
              {t('question_dashboard')}
            </Text>
          </VStack>
          <Pressable
            onPress={() => navigate(SceneNames.MenuSettingsScreen)}
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
          h={[72, 80, 96]}
          bg={colors.primary.FIRST}
          rounded={'xl'}
          shadow={9}
          mb={[2, 4, 6]}
          p={4}>
          <FlatList
            data={services}
            numColumns={2}
            renderItem={({item, index}) => renderButtonItem(item, index)}
            keyExtractor={item => item.text}
            w={'full'}
            h={['md', 'lg', 700]}
            _contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              h: 'full',
            }}
          />
        </HStack>
        <Divider bg={colors.primary.FIRST} />
        <VStack h={['sm', 'md', 'lg']} w={'full'}>
          <HStack justifyContent={'space-between'} mt={[]}>
            <Text
              fontSize={['md', 'xl', '2xl']}
              color={colors.text.TEXT_BLACK}
              bold>
              {t('ranking_tickers')}
            </Text>

            <Pressable
              onPress={() => navigate(SceneNames.AllTickersScreen)}
              h={[10, 12, 16]}
              alignItems={'center'}
              justifyContent={'flex-start'}>
              <Text
                fontSize={['md', 'xl', '2xl']}
                color={colors.text.TEXT_BLACK}
                bold
                mb={[0]}>
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
                        textAlign={'center'}
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
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          maximumFractionDigits: 2,
                          currency: 'USD',
                        }).format(ticker.price_usd)}
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
