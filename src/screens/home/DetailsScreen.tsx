import React, {useEffect, useState, useRef} from 'react';
import {
  Box,
  Text,
  Input,
  ScrollView,
  Center,
  Image,
  Stack,
  FormControl,
} from 'native-base';
import {icons} from '../../assets/images/icons';
import {useNavigation} from '@react-navigation/native';
import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
import SceneNames from '../../navigation/SceneNames';
import {useTranslation} from 'react-i18next';
import colors from '../../theme/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import {dataTickers, getTicker} from '../../services/DashboardService';
import {useRequestContext} from '../../services/context/RequestContext';

const DetailsScreen = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation<GenericStackNavigationProp>();
  const {params} =
    useRoute<RouteProp<RootStackParamList, SceneNames.DetailsScreen>>();
  const ref = useRef(null);
  const [{}, {loadingHandler, errorHandler}] = useRequestContext();
  const [dataTicker, setDataTicker] = useState<dataTickers>();

  useEffect(() => {
    loadingHandler(true);
    getTicker(
      {
        id: params.id,
      },
      (result: any) => {
        setDataTicker(result[0]);
        loadingHandler(false);
      },
      errorHandler,
    );
  }, []);

  const onPress = () => {
    loadingHandler(false);
    navigate(SceneNames.DashboardScreen);
  };

  return (
    <Box flex={1} bg={colors.neutral.WHITE}>
      <ScrollView>
        <Center px={[6, 10, 16]} py={[10, 12, 16]}>
          <Stack
            w={'full'}
            rounded="xl"
            bg={colors.neutral.WHITE}
            shadow={7}
            space={5}
            pb={5}>
            <Stack
              bg={colors.neutral.WHITE}
              rounded={'full'}
              borderColor={colors.neutral.WHITE}
              w={[20, 24, 32]}
              h={[20, 24, 32]}
              mt={[-8, -9, -10]}
              left={[9, 10, 12]}
              shadow={6}
              justifyContent="center"
              alignItems="center">
              <Image
                source={icons.mainIcon}
                alt="image"
                h={[16, 20, 24]}
                w={[16, 20, 24]}
                rounded={'full'}
              />
            </Stack>
            <Stack space={5} alignItems="center">
              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('symbol')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={dataTicker?.symbol}
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('name')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={dataTicker?.name}
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('price_usd')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={
                    dataTicker
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          maximumFractionDigits: 2,
                          currency: 'USD',
                        }).format(Number(dataTicker.price_usd))
                      : '$ 0'
                  }
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('price_btc')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={
                    dataTicker
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          maximumFractionDigits: 2,
                          currency: 'USD',
                        }).format(Number(dataTicker.price_btc))
                      : '$ 0'
                  }
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('percent_change_24h')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={dataTicker?.percent_change_24h}
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('percent_change_1h')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={dataTicker?.percent_change_1h}
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('percent_change_7d')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={dataTicker?.percent_change_7d}
                />
              </FormControl>

              <FormControl w={['90%']}>
                <Text
                  color={colors.primary.FIRST}
                  fontSize={['sm', 'md', '3xl']}>
                  {t('market_cap_usd')}
                </Text>
                <Input
                  bg={colors.neutral.WHITE}
                  borderColor={colors.neutral.WHITE}
                  borderBottomColor={colors.neutral.GRAY}
                  borderBottomWidth={[1, 2, 2]}
                  editable={false}
                  w={'full'}
                  h={[10, 12, 16]}
                  fontSize={['sm', 'md', '2xl']}
                  value={new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    maximumFractionDigits: 2,
                    currency: 'USD',
                  }).format(Number(dataTicker?.market_cap_usd))}
                />
              </FormControl>
            </Stack>
          </Stack>
        </Center>
      </ScrollView>
    </Box>
  );
};
export default DetailsScreen;
