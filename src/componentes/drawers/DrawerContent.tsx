// import React, {useState} from 'react';
// import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
// import {Divider} from 'native-base';
// import {changeLanguage} from 'i18next';
// import {Country} from 'react-native-country-picker-modal';
// import {Box, HStack, Pressable, Spacer, VStack, Text} from 'native-base';
// import SceneNames from '../../navigation/SceneNames';
// import {GenericStackNavigationProp} from '../../navigation/StackNavigationProp';
// import {useNavigation} from '@react-navigation/native';
// import {useLoginSweet} from '../../utils/context/useLoginSweet';

// const DrawerContent = () => {
//   const navigation = useNavigation<GenericStackNavigationProp>();

//   const languages = [
//     {
//       countryCode: 'US',
//       code: 'en_us',
//     },
//     {
//       countryCode: 'ES',
//       code: 'en_es',
//     },
//     {
//       countryCode: 'FR',
//       code: 'en_fr',
//     },
//     {
//       countryCode: 'PT',
//       code: 'en_pt',
//     },
//   ];

//   const {user} = useUser();
//   const [{}, {logout}] = useLoginSweet();

//   let rating =
//     (+(user?.applicantRating || 0) + +(user?.backingRating || 0)) / 2;

//   const [countryCode, setCountryCode] = useState<string>('ES');
//   const [withCountryNameButton, setWithCountryNameButton] =
//     useState<boolean>(true);
//   const [withFlag, setWithFlag] = useState<boolean>(true);
//   const [withEmoji, setWithEmoji] = useState<boolean>(true);
//   const onSelect = (country: Country) =>
//     changeLanguage(
//       languages.find(l => l.countryCode === country.cca2)?.code || 'en_es',
//     );

//   return (
//     <SafeAreaView style={{flex: 1, width: '100%'}}>
//       <View style={styles.drawerContent}>
//         <Drawer.Section style={styles.drawerSection}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate(SceneNames.AccountScreen)}>
//             <Box pl="4" py="2">
//               <HStack alignItems="center" space={3}>
//                 <Avatar.Image
//                   source={{
//                     uri: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
//                   }}
//                   size={50}
//                 />

//                 <VStack>
//                   <Title style={styles.title}>
//                     {truncate(user?.fullName || user?.username || '', 16)}
//                   </Title>
//                   <Caption style={styles.caption}>Verificado</Caption>
//                   <View
//                     pointerEvents="none"
//                     style={{
//                       flexDirection: 'row',
//                       alignSelf: 'center',
//                       marginBottom: 10,
//                     }}>
//                     <Rating
//                       type="custom"
//                       ratingColor={colors.SEMANTIC_ICONS}
//                       ratingBackgroundColor={colors.BACKGROUND_WHITE}
//                       ratingCount={5}
//                       startingValue={rating}
//                       imageSize={25}
//                     />
//                     <Text mr={2}> ({rating}) </Text>
//                   </View>
//                 </VStack>
//                 <Spacer />
//                 <View style={styles.arrowIcon}>
//                   <CustomIcons
//                     height={27}
//                     width={27}
//                     name={svgs.RightArrow.name}
//                   />
//                 </View>
//               </HStack>
//             </Box>
//           </TouchableOpacity>

//           <Divider />
//           <Box pt={4} pl={4}>
//             <Pressable
//               py="2"
//               onPress={() => navigation.navigate(SceneNames.HomeScreen)}>
//               <Box pl="4" pr="5" py="2">
//                 <HStack alignItems="center">
//                   <CustomIcons
//                     height={20}
//                     width={20}
//                     name={svgs.ChartTreeMap.name}
//                   />
//                   <Text style={styles.textDrawerButton}>Inicio</Text>
//                 </HStack>
//               </Box>
//             </Pressable>
//             <Pressable
//               py="2"
//               onPress={() => navigation.navigate(SceneNames.TripsScreen)}>
//               <Box pl="4" pr="5" py="2">
//                 <HStack alignItems="center">
//                   <CustomIcons height={20} width={20} name={svgs.Car.name} />
//                   <Text style={styles.textDrawerButton}>Apoyos</Text>
//                 </HStack>
//               </Box>
//             </Pressable>
//             <Pressable
//               py="2"
//               onPress={() => navigation.navigate(SceneNames.AccountScreen)}>
//               <Box pl="4" pr="5" py="2">
//                 <HStack alignItems="center">
//                   <FontAwesome
//                     name="user"
//                     size={20}
//                     color={colors.PRIMARY}
//                     style={{marginRight: 8}}
//                   />
//                   <Text style={styles.textDrawerButton}>Mi cuenta</Text>
//                 </HStack>
//               </Box>
//             </Pressable>
//             <Pressable py="2" onPress={logout}>
//               <Box pl="4" pr="5" py="2">
//                 <HStack alignItems="center">
//                   <CustomIcons
//                     height={22}
//                     width={22}
//                     name={svgs.Exit.name}
//                     color={colors.PRIMARY}
//                   />
//                   <Text style={styles.textDrawerButton}>Cerrar sesión</Text>
//                 </HStack>
//               </Box>
//             </Pressable>
//           </Box>
//           <View
//             style={{
//               height: 50,
//               width: '80%',
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//               borderRadius: 10,
//               marginLeft: 20,
//               position: 'absolute',
//               bottom: 0,
//             }}>
//             {/* <CountryPicker
//               {...{
//                 countryCode,
//                 countryCodes: ['ES'],
//                 disableNativeModal: false,
//                 translation: ['spa'],
//                 withFlag,
//                 withCountryNameButton,
//                 preferredCountries: ['ES'],
//                 withEmoji,
//                 onSelect,
//               }}
//             /> */}
//           </View>
//         </Drawer.Section>
//       </View>
//     </SafeAreaView>
//   );
// };
// export default DrawerContent;
// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     fontSize: normalize(16),
//     marginTop: 3,
//     fontWeight: 'bold',
//     color: colors.TEXT_TITLE_DRAWER,
//     fontFamily: fontFamily.title,
//   },
//   caption: {
//     fontSize: normalize(14),
//     lineHeight: 14,
//     fontFamily: fontFamily.subtitle,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//     flex: 1,
//   },
//   bottomDrawerSection: {
//     marginBottom: 15,
//     borderTopColor: '#f4f4f4',
//     borderTopWidth: 1,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   starsIconContainer: {
//     flexDirection: 'row',
//     marginRight: normalize(6),
//   },
//   arrowIcon: {
//     alignSelf: 'center',
//     paddingTop: 15,
//   },
//   textDrawerButton: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.TEXT_DRAWER,
//     marginLeft: 15,
//     fontFamily: fontFamily.title,
//   },
// });
