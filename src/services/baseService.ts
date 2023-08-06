//TODO: Si es un service porque esta dentro de utils? Tiene su carpeta de services.

import { environment } from '../environments/environment';
export const API_URL = environment.API_URL_DEV;
import i18n from '../../i18n.config';
// import crashlytics from '@react-native-firebase/crashlytics';

let language: string;
if (i18n.language === 'fr') {
    language = 'fr-FR';
} else if (i18n.language === 'es') {
    language = 'es-ES';
} else {
    language = 'en-US';
}
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

export type ErrorHanlder = (error: string) => void;
export type FetchResponse = {
    code: string;
    description: string;
    statusCode?: number;
};

export async function myFetch<T extends FetchResponse>(
    endpoint: string,
    pay: string,
    resultHandler: (response: T) => void,
    errorHandler: ErrorHanlder,
    method = HttpMethod.POST,
    aditionalHeaders?: { [key: string]: string }
) {
    const parse = JSON.parse(pay);
    const payload = { ...parse, language };
    const url = API_URL + endpoint;
    const body =
        method !== HttpMethod.GET ? { body: JSON.stringify(payload) } : {};

    const request = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Basic YWRtaW46Z3l0ciU2NzgqMzQyMzUlZHNoITsvLixqdWhkPw==',
            ...aditionalHeaders
        },
        ...body
    };

    return fetch(url, request)
        .then((response) => {
            if (response.status >= 500) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then((data: T) => {
            if (data.statusCode && data.statusCode >= 400) {
                throw new Error(data.description || 'Bad response from server');
            }
            resultHandler(data);
        })
        .catch((error: Error) => {
            // crashlytics().recordError(error);
            errorHandler(error.message);
        });
}
