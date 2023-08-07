import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import SceneNames from './SceneNames';
import { NavigationProp } from '@react-navigation/native';

export type GenericStackNavigationProp = NavigationProp<RootStackParamList>;

export type WelcomeScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.WelcomeScreen
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

export type MenuSettings = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.MenuSettings
>;

export type SelectLanguageScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.SelectLanguageScreen
>;

export type DetailsScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.DetailsScreen
>;
