import axios from "axios";
import { Transaction } from "src/model/payment";
import {
  SignInModel,
  UpdateLastMatchCode,
  UserSignUpModel,
} from "src/model/user";

const baseUrl = "https://nu1kgj5cbk.execute-api.us-east-1.amazonaws.com";

export const isSteamConnected = async (steamId: string) => {
  const { data } = await axios.post(`${baseUrl}/is-steam-exists`, {
    steamId: steamId,
  });
  return data;
};
export const createBlockchainUser = async (signUpModel: UserSignUpModel) => {
  const { data } = await axios.post(`${baseUrl}/sign-up`, signUpModel);
  return data;
};
export const signIn = async (request: SignInModel) => {
  const { data } = await axios.post(`${baseUrl}/sign-in`, request);
  return data;
};
export const updateLastMatchCode = async (request: UpdateLastMatchCode) => {
  await axios.post(`${baseUrl}/update-last-match-code`, request);
};

export const getWalletBalance = async (walletAddress: string) => {
  const { data } = await axios.get(`${baseUrl}/get-wallet-balance`, {
    params: {
      walletAddress,
    },
  });
  return data;
};
export const addTransactions = async (transactions: Transaction[]) => {
  await axios.post(`${baseUrl}/add-transactions`, {
    transactions: transactions,
  });
};
