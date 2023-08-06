import { extendTheme } from 'native-base';
import {
    ErrorHanlder as ErrorHandler,
    HttpMethod,
    myFetch,
    FetchResponse
} from './baseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type GeneralTokenResponse = {
    code: string;
    description: string;
    key?: string;
};

export type GeneralResponse = {
    code: string;
    description: string;
    object_?: { eMail?: string };
};

export type CustomerResponse = {
    code: string;
    description: string;
    object_?: CustomerInformation;
};

export type CustomerInformation = {
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
};

type GeneralResponseHandler = (response: GeneralResponse) => void;
type CustomerResponseHandler = (response: CustomerResponse) => void;

export const getToken = async () => ({
    Authorization: `Bearer ${await AsyncStorage.getItem('@token')}`
});
export interface RequestGeneral {
    phonePrefix: string;
    phoneNumber: string;
}
export interface RequestLogin extends RequestGeneral {
    secretCode: string;
    deviceID: string;
}
interface RequestFA extends RequestLogin {
    pinTemp: string;
    token: string;
    deviceType: string;
}
interface RequestRescueProfileStep2 extends RequestGeneral {
    pinTemp: string;
}
interface RequestRescueProfileStep3 extends RequestRescueProfileStep2 {
    secretCodeNew: string;
}
interface RequestRegister extends RequestGeneral {
    fName: string;
    mname: string;
    lName: string;
    slName: string;
    eMail: string;
}
interface RequestPinRegister extends RequestGeneral {
    secretCode: string;
}
interface RequestP2FAregistration extends RequestPinRegister {
    pinTemp: string;
}
interface RequestRegister extends RequestGeneral {
    fName: string;
    mname: string;
    lName: string;
    slName: string;
    eMail: string;
}
interface RequestLoginToken {
    agencyCode: string;
    phoneNumberPrefix: string;
    phoneNumber: string;
    pin: string;
}
interface Request2FA extends RequestGeneral {
    opcion: string;
    eMail: string;
}

type GeneralTokenResponseHandler = (response: GeneralTokenResponse) => void;
export const loginGetToken = async (
    form: RequestLoginToken,
    resultHandler: GeneralTokenResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralTokenResponse>(
        'getToken',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );

export const login = async (
    form: RequestLogin,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'login',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );

export const login2FA = async (
    form: RequestFA,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'login2FA',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );

export const resend2FA = async (
    form: Request2FA,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/resend2FANew',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );

export const customerFind = async (
    form: RequestGeneral,
    resultHandler: CustomerResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<CustomerResponse>(
        'customer/find',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST,
        await getToken()
    );

export const rescueProfileStep1 = async (
    form: RequestGeneral,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/rescueProfileStep1',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST,
        await getToken()
    );

export const rescueProfileStep2 = async (
    form: RequestRescueProfileStep2,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/rescueProfileStep2',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST,
        await getToken()
    );

export const rescueProfileStep3 = async (
    form: RequestRescueProfileStep3,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/rescueProfileStep3',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST,
        await getToken()
    );

export const register = async (
    form: RequestRegister,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/register',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );

export const pinRegistration = async (
    form: RequestPinRegister,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/pinRegistration',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );

export const FAregistration = async (
    form: RequestP2FAregistration,
    resultHandler: GeneralResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<GeneralResponse>(
        'customer/2FAregistration',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST
    );
