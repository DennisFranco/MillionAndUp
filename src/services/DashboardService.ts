import { getToken } from './AuthService';
import {
    ErrorHanlder as ErrorHandler,
    HttpMethod,
    myFetch,
    FetchResponse
} from './baseService';

export type TopNWalletTransactionsResponse = {
    code: string;
    description: string;
    object_?: TopNWalletTransactions[];
};

export type DisplayTransactionInfoResponse = {
    code: string;
    description: string;
    object_?: TopNWalletTransactions;
};

export type TopNWalletTransactions = {
    mainPayeeCode: string;
    mainPayeeName: string;
    payeeCode: string;
    payeeName: string;
    recipientName: string;
    currencyDestinatioCode: string;
    currencyDestinationName: string;
    countryDestinationCode: string;
    countryDestinationName: string;
    paymentMode: string;
    bankName: string;
    bankBranch: string;
    bankAccountType: string;
    bankAccountNumber: string;
    identityCode: string;
    amount: string;
    fee: string;
    total: string;
    totalReceived: string;
    dateTime: string;
};

type TopNWalletTransactionsResponseHandler = (
    response: TopNWalletTransactionsResponse
) => void;
type DisplayTransactionInfoResponseHandler = (
    response: DisplayTransactionInfoResponse
) => void;

interface RequestGeneral {
    agencyCode: string;
    customerId: string;
}
interface RequestDisplayTransactionInfo extends RequestGeneral {
    transactionID: string
}

export const getTopNWalletTransactions = async (
    form: RequestGeneral,
    resultHandler: TopNWalletTransactionsResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<TopNWalletTransactionsResponse>(
        'sendTrans/getTopNWalletTransactions',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST,
        await getToken()
    );

export const displayTransactionInfo = async (
    form: RequestDisplayTransactionInfo,
    resultHandler: DisplayTransactionInfoResponseHandler,
    errorHandler: ErrorHandler
) =>
    myFetch<DisplayTransactionInfoResponse>(
        'sendTrans/displayTransactionInfo',
        JSON.stringify(form),
        resultHandler,
        errorHandler,
        HttpMethod.POST,
        await getToken()
    );
