import { createStore, createHook, StoreActionApi } from 'react-sweet-state';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = {
    isLoading: boolean;
    error: string;
};
type StoreApi = StoreActionApi<State>;
type Actions = typeof actions;

const initialState: State = {
    isLoading: false,
    error: ''
};

const actions = {
    loadingHandler:
        (isLoading: boolean, caller?: string) =>
        ({ setState }: StoreApi) => {
            setState({
                isLoading: isLoading
            });
        },

    successHandler:
        (message: string) =>
        ({ setState }: StoreApi) => {
            Toast.show({
                type: 'success',
                text1: message
            });
            setState({
                isLoading: false
            });
        },

    errorHandler:
        (error: string) =>
        ({ setState }: StoreApi) => {
            Toast.show({
                type: 'error',
                text1: error
            });

            setState({
                isLoading: false,
                error: error
            });
        }
};

export const getPersist = async (atribute: string) => {
    try {
        return await AsyncStorage.getItem(atribute);
    } catch (e) {
        console.log('AsyncStorage error', e);
        return '';
    }
};
export const persist = async (value: string, atribute: string) => {
    try {
        await AsyncStorage.setItem(atribute, value);
    } catch (e) {
        console.log('AsyncStorage error', e);
    }
};
const Store = createStore<State, Actions>({
    initialState,
    actions
});

export const useRequestContext = createHook(Store);
