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
  Input,
  FlatList,
} from 'native-base';
import {icons} from '../../assets/images/icons';
import {useRequestContext} from '../../services/context/RequestContext';
import SceneNames from '../../navigation/SceneNames';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import {useNavigation} from '@react-navigation/native';
import {dataTickers, getTickers} from '../../services/DashboardService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {normalize} from '../../theme/scale';

Ionicons.loadFont();
const AllTickersScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const [{}, {loadingHandler, errorHandler}] = useRequestContext();
  const [limit, setLimit] = useState(100);
  const [start, setStart] = useState(0);

  const [dataTickers, setDataTickers] = useState<dataTickers[]>();
  const [tickerSearch, setTickerSearch] = useState<dataTickers[]>();

  useEffect(() => {
    apis(start, limit);
  }, []);

  const apis = (start: number, limit: number) => {
    if (limit >= 50 && start >= 0) {
      loadingHandler(true);
      getTickers(
        {
          start,
          limit,
        },
        (result: any) => {
          setStart(start);
          setLimit(limit);
          setTickerSearch(result.data);
          setDataTickers(result.data);
          loadingHandler(false);
        },
        errorHandler,
      );
    }
  };

  const handleSearch = async (text: any) => {
    if (text != '') {
      const newData = await dataTickers?.filter(item => {
        const itemData = item?.name
          ? item.name.toUpperCase()
          : ''.toLowerCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setTickerSearch(newData);
    } else {
      setTickerSearch(dataTickers);
    }
  };

  const renderButtonItem = (item: any, index: any) => (
    <Pressable
      onPress={() => navigate(SceneNames.DetailsScreen, {id: item.id})}
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
            bold
            isTruncated
            numberOfLines={2}>
            {item.name}
          </Text>
          <Text
            color={colors.neutral.GRAY}
            alignItems={'flex-start'}
            alignSelf={'flex-start'}
            textAlign="center"
            fontSize={['xs', 'md', 'lg']}>
            {item.symbol}
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
              item.amount < 0
                ? colors.text.TEXT_ERROR
                : colors.text.TEXT_PRIMARY
            }>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              maximumFractionDigits: 2,
              currency: 'USD',
            }).format(item.price_usd)}
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
  );

  return (
    <Box flex={1} bg={colors.neutral.WHITE} safeArea>
      <Stack px={[6, 8, 10]} h={['full', 'full', 'full']} space={[2, 8, 12]}>
        <HStack
          h={[20, 24, 32]}
          w={'full'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Input
            h={[12, 16, 20]}
            w={['full']}
            borderRadius="8"
            InputLeftElement={
              <Ionicons
                name={'search-outline'}
                size={normalize(20)}
                color={colors.primary.FIRST}
                style={{marginLeft: 10}}
              />
            }
            placeholder={t('search_tickers')}
            fontSize="md"
            onChangeText={value => handleSearch(value)}
          />
        </HStack>

        <VStack h={['lg', 'full', 'full']} w={'full'}>
          {tickerSearch ? (
            <FlatList
              data={tickerSearch}
              renderItem={({item, index}) => renderButtonItem(item, index)}
              keyExtractor={item => item.name}
              w={'full'}
              h={['lg', 'lg', '2xl']}
              _contentContainerStyle={{
                alignItems: 'center',
              }}
            />
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
        </VStack>
        <HStack alignItems="center" justifyContent={'center'} space={5}>
          <Button
            variant="outline"
            onPress={() => apis(start - 50, limit - 50)}
            h={[8, 16, 20]}
            w={[8, 20, 24]}
            p={0}
            borderWidth={0}
            bg={colors.neutral.WHITE}
            rounded={'md'}
            _text={{
              fontSize: ['2xl', '4xl', '5xl'],
              color: colors.text.TEXT_WHITE,
              textAlign: 'center',
            }}>
            <Ionicons
              name={'chevron-back'}
              size={normalize(20)}
              color={colors.primary.FIRST}
            />
          </Button>
          <Button
            variant="outline"
            onPress={() => apis(start + 50, limit + 50)}
            h={[8, 16, 20]}
            w={[8, 20, 24]}
            p={0}
            borderWidth={0}
            bg={colors.neutral.WHITE}
            rounded={'md'}
            _text={{
              fontSize: ['2xl', '4xl', '5xl'],
              color: colors.text.TEXT_WHITE,
              textAlign: 'center',
            }}>
            <Ionicons
              name={'chevron-forward'}
              size={normalize(20)}
              color={colors.primary.FIRST}
            />
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default AllTickersScreen;
