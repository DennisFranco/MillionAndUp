import prod from './prod/environmentProd';
import dev from './dev/environmentDev';

export interface ConfigInterface {
  API_URL_DEV: string;
  API_SOCKET: string;
}
let config: ConfigInterface;
if (process.env.REACT_APP_APPENV === 'develop') {
  config = dev;
} else {
  config = prod;
}

export const environments = {
  prod,
  dev,
};

export const environment = environments.dev;

export default config;
