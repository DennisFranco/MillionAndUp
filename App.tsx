import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamily} from './src/theme';
import colors from './src/theme/colors';
import Toast from 'react-native-toast-message';
import SceneNames from './src/navigation/SceneNames';
import './i18n.config';
import {useTranslation} from 'react-i18next';
import {toastConfig} from './src/componentes/toasts/ToastElement';
import LoaderElement from './src/componentes/loaders/loaders';
import {useUserSweet} from './src/services/context/useUserSweet';
import LanguageScreen from './src/screens/auth/LanguageScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import RegisterScreen from './src/screens/auth/signUp/RegisterScreen';
import SignInScreen from './src/screens/auth/signIn/SignInScreen';
import DashboardScreen from './src/screens/home/DashboardScreen';
import DetailsScreen from './src/screens/home/DetailsScreen';
import SelectLanguageScreen from './src/screens/home/SelectLanguageScreen';
import {getPersist} from './src/services/context/RequestContext';
import PreviewScreen from './src/screens/auth/PreviewScreen';
import AllTickersScreen from './src/screens/home/AllTickersScreen';
import MenuSettingsScreen from './src/screens/home/MenuSettingsScreen';

Ionicons.loadFont();
const theme = extendTheme({
  colors: colors,
  fonts: {
    heading: fontFamily.PoppinsMedium,
    body: fontFamily.PoppinsMedium,
    mono: fontFamily.PoppinsMedium,
  },
});
const Stack = createNativeStackNavigator();

const App = () => {
  const {t} = useTranslation();
  const [{token}] = useUserSweet();
  const [firstLaunched, setFirstLaunched] = useState(false);
  if (__DEV__) {
    import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured'),
    );
  }

  useEffect(() => {
    getPersist('hasFirstLaunched')
      .then(exist => setFirstLaunched(exist ? true : false))
      .catch(error => {
        setFirstLaunched(false);
      });
  }, []);

  const homeScreens = () => (
    <>
      {!firstLaunched && (
        <>
          <Stack.Screen
            name={SceneNames.LanguageScreen}
            component={LanguageScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={SceneNames.WelcomeScreen}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}

      <Stack.Screen
        name={SceneNames.PreviewScreen}
        component={PreviewScreen}
        options={{...authStylesHeader}}
      />

      <Stack.Screen
        name={SceneNames.SignInScreen}
        component={SignInScreen}
        options={{...authStylesHeader}}
      />

      <Stack.Screen
        name={SceneNames.RegisterScreen}
        component={RegisterScreen}
        options={{...authStylesHeader}}
      />

      <Stack.Screen
        name={SceneNames.DashboardScreen}
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={SceneNames.DetailsScreen}
        component={DetailsScreen}
        options={{
          ...authStylesHeader,
          headerBackTitleVisible: false,
          headerTitle: t('details'),
          headerTitleAlign: 'center',
          headerBackTitle: '',
        }}
      />

      <Stack.Screen
        name={SceneNames.MenuSettingsScreen}
        component={MenuSettingsScreen}
        options={{
          ...menuStylesHeader,
          headerTitle: t('settings'),
        }}
      />

      <Stack.Screen
        name={SceneNames.SelectLanguageScreen}
        component={SelectLanguageScreen}
        options={{
          ...menuStylesHeader,
          headerTitle: t('settings'),
        }}
      />

      <Stack.Screen
        name={SceneNames.AllTickersScreen}
        component={AllTickersScreen}
        options={{
          ...menuStylesHeader,
          headerTitle: t('settings'),
        }}
      />
    </>
  );

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>{homeScreens()}</Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
      <LoaderElement />
    </NativeBaseProvider>
  );
};

const authStylesHeader = {
  title: '',
  headerShown: true,
  headerBackTitleVisible: false,
  headerBackTitle: '',
  headerTintColor: colors.text.TEXT_PRIMARY,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.neutral.WHITE,
  },
};

const menuStylesHeader = {
  title: '',
  headerShown: true,
  headerBackTitleVisible: false,
  headerTintColor: colors.neutral.WHITE,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.primary.FIRST,
  },
};

export default App;
