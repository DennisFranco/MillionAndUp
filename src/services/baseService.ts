import {environment} from '../environments/environment';
export const API_URL = environment.API_URL_DEV;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export type ErrorHanlder = (error: string) => void;
export type FetchResponse = {};

export async function myFetch<T extends FetchResponse>(
  endpoint: string,
  pay: string,
  resultHandler: (response: T) => void,
  errorHandler: ErrorHanlder,
  method = HttpMethod.POST,
  aditionalHeaders?: {[key: string]: string},
) {
  const parse = JSON.parse(pay);
  const payload = {...parse};
  const url = API_URL + endpoint;
  const body = method !== HttpMethod.GET ? {body: JSON.stringify(payload)} : {};

  const request = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...aditionalHeaders,
    },
    ...body,
  };

  return fetch(url, request)
    .then(response => {
      if (response.status >= 500) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((data: T) => {
      resultHandler(data);
    })
    .catch((error: Error) => {
      errorHandler(error.message);
    });
}
