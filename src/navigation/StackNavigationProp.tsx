import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import SceneNames from './SceneNames';
import { NavigationProp } from '@react-navigation/native';

export type GenericStackNavigationProp = NavigationProp<RootStackParamList>;

export type LanguageScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.LanguageScreen
>;

export type WelcomeScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.WelcomeScreen
>;

export type PreviewScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.PreviewScreen
>;

export type SignInScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.SignInScreen
>;

export type RegisterScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.RegisterScreen
>;

export type DashboardScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.DashboardScreen
>;

export type MenuSettingsScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.MenuSettingsScreen
>;

export type SelectLanguageScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.SelectLanguageScreen
>;

export type DetailsScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.DetailsScreen
>;

export type AllTickersScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.AllTickersScreen
>;
