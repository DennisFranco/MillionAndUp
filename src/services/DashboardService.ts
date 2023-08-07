import {ErrorHanlder as ErrorHandler, HttpMethod, myFetch} from './baseService';

export type GlobalCryptoData = {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: string;
  eth_d: string;
  mcap_change: string;
  volume_change: string;
  avg_change_percent: string;
  volume_ath: number;
  mcap_ath: number;
};

export type GeneralTickerResponse = {
  data: dataTickers[];
  info: {coins_num: number; time: number};
};

export type dataTickers = {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: 1;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
};

type GlobalCryptoDataHandler = (response: GlobalCryptoData) => void;
type GeneralTickerResponseHandler = (response: GeneralTickerResponse) => void;

interface RequestTickers {
  start: number;
  limit: number;
}
interface RequestTicker {
  id: string;
}

export const getbodyGlobalCryptoData = async (
  form: {},
  resultHandler: GlobalCryptoDataHandler,
  errorHandler: ErrorHandler,
) =>
  myFetch<GlobalCryptoData>(
    'global/',
    JSON.stringify(form),
    resultHandler,
    errorHandler,
    HttpMethod.GET,
  );

export const getTickers = async (
  form: RequestTickers,
  resultHandler: GeneralTickerResponseHandler,
  errorHandler: ErrorHandler,
) =>
  myFetch<GeneralTickerResponse>(
    'tickers/?start=' + form.start + '&limit=' + form.limit,
    JSON.stringify({}),
    resultHandler,
    errorHandler,
    HttpMethod.GET,
  );

export const getTicker = async (
  form: RequestTicker,
  resultHandler: GeneralTickerResponseHandler,
  errorHandler: ErrorHandler,
) =>
  myFetch<GeneralTickerResponse>(
    'ticker/?id=' + form.id,
    JSON.stringify({}),
    resultHandler,
    errorHandler,
    HttpMethod.GET,
  );
