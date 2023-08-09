import {createStore, createHook} from 'react-sweet-state';

export type UserLogin = {
  email?: string;
  password?: string;
  name?: string;
};
export interface Token {
  key: string;
}

const Store = createStore({
  initialState: {
    userLoginData: {} as UserLogin,
    token: {} as Token,
  },
  actions: {
    setUserLoginData:
      (userLoginData: UserLogin) =>
      ({setState}) => {
        setState({
          userLoginData,
        });
      },
    setToken:
      (token: Token) =>
      ({setState}) => {
        setState({
          token,
        });
      },
  },
  name: 'useUserSweet',
});
export const useUserSweet = createHook(Store);
