import React from 'react';
import { Box, Text, Stack, Button, HStack, Image } from 'native-base';
import { useTranslation } from 'react-i18next';
import colors from '../../theme/colors';
import i18n from '../../../i18n.config';
import { icons } from '../../assets/images/icons';

const SelectLanguageScreen = () => {
    const { t } = useTranslation();

    const lang = (data: string) => {
        i18n.changeLanguage(data);
    };

    return (
        <Box flex={1} safeArea>
            <Stack
                px={[6, 8, 10]}
                space={[12, 16, 20]}
                alignItems="center"
                pt={[10, 12, 16]}
            >
                <Text
                    color={colors.neutral.BLACK}
                    fontSize={['2xl', '3xl', '5xl']}
                >
                    {t('lets_begin')}
                </Text>
                
                <Button
                    h={[53, 65, 20]}
                    w={['full', 'lg', '2xl']}
                    rounded={'xl'}
                    _pressed={{
                        backgroundColor: colors.primary.DARKFIRST
                    }}
                    bg={colors.primary.FIRST}
                    _text={{
                        fontSize: ['sm', 'md', '4xl'],
                        color: colors.text.TEXT_WHITE
                    }}
                    onPress={() => lang('en')}
                >
                    <HStack alignItems="center">
                        <Image
                            resizeMode="contain"
                            size={[8, 10, 12]}
                            source={icons.EN_flag}
                            alt="English (US)"
                        />
                        <Text
                            color={colors.neutral.WHITE}
                            fontSize={['md', 'lg', '4xl']}
                            pl={[4, 6, 8]}
                        >
                            {t('English')}
                        </Text>
                    </HStack>
                </Button>

                <Button
                    h={[53, 65, 20]}
                    w={['full', 'lg', '2xl']}
                    rounded={'xl'}
                    _pressed={{
                        backgroundColor: colors.primary.DARKFIRST
                    }}
                    bg={colors.primary.FIRST}
                    _text={{
                        fontSize: ['sm', 'md', '4xl'],
                        color: colors.text.TEXT_WHITE
                    }}
                    onPress={() => lang('es')}
                >
                    <HStack alignItems="center">
                        <Image
                            resizeMode="contain"
                            size={[8, 10, 12]}
                            source={icons.ES_flag}
                            alt="Spanish"
                        />
                        <Text
                            color={colors.neutral.WHITE}
                            fontSize={['md', 'lg', '4xl']}
                            pl={[4, 6, 8]}
                        >
                            {t('Spanish')}
                        </Text>
                    </HStack>
                </Button>

                <Button
                    h={[53, 65, 20]}
                    w={['full', 'lg', '2xl']}
                    rounded={'xl'}
                    _pressed={{
                        backgroundColor: colors.primary.DARKFIRST
                    }}
                    bg={colors.primary.FIRST}
                    _text={{
                        fontSize: ['sm', 'md', '4xl'],
                        color: colors.text.TEXT_WHITE
                    }}
                    onPress={() => lang('fr')}
                >
                    <HStack alignItems="center">
                        <Image
                            resizeMode="contain"
                            size={[8, 10, 12]}
                            source={icons.FR_flag}
                            alt="French"
                        />
                        <Text
                            color={colors.neutral.WHITE}
                            fontSize={['md', 'lg', '4xl']}
                            pl={[4, 6, 8]}
                        >
                            {t('French')}
                        </Text>
                    </HStack>
                </Button>
            </Stack>
        </Box>
    );
};
export default SelectLanguageScreen;
