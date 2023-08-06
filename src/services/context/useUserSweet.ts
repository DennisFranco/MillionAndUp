import { createStore, createHook } from 'react-sweet-state';
import { CustomerCoin } from '../DashboardService';

export interface UserInformation {
    senderCode: string;
    identityCode: string;
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    countryCode: string;
    photoPaTH: string;
    language: string;
    timeZone: string;
    pushNotificationId: string;
    phoneSecretWord: string;
    idValid: string;
    idInReview: string;
    defaultCurrency: string;
    eMail: string;
}

export type UserLogin = {
    phonePrefix?: string;
    phoneNumber?: string;
    secretCode?: string;
    deviceID?: string;
};
export interface Token {
    key: string;
}

export interface AgencyInfo {
    code: string;
    name: string;
    countryCode: string;
    stateCode: string;
    cityCode: string;
}

const Store = createStore({
    initialState: {
        userInformation: {} as UserInformation,
        userLoginData: {} as UserLogin,
        userCoinBalance: {} as CustomerCoin,
        token: {} as Token,
        agencyInfo: {} as AgencyInfo
    },
    actions: {
        setUserInformation:
            (userInformation: UserInformation) =>
            ({ setState }) => {
                setState({
                    userInformation
                });
            },
        setUserCoinBalance:
            (userCoinBalance: CustomerCoin) =>
            ({ setState }) => {
                setState({
                    userCoinBalance
                });
            },
        setUserLoginData:
            (userLoginData: UserLogin) =>
            ({ setState }) => {
                setState({
                    userLoginData
                });
            },
        setToken:
            (token: Token) =>
            ({ setState }) => {
                setState({
                    token
                });
            },
        setAgencyInfo:
            (agencyInfo: AgencyInfo) =>
            ({ setState }) => {
                setState({
                    agencyInfo
                });
            }
    },
    name: 'useUserSweet'
});
export const useUserSweet = createHook(Store);
