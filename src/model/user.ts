export interface UserSignUpModel {
  steamId: string;
  matchHistoryAuthCode: string;
  latestMatchCode: string;
}

export interface SignInModel {
  steamId: string;
  password: string;
}

export interface SignInResponse {
  steamId64: string;
  matchHistoryAuthCode: string;
  latestMatchCode: string;
}

export interface CreateTransactionRequest {
  fromAddress: string | null;
  toAddress: string;
  privateKey: string;
  amount: number;
}
export interface UpdateLastMatchCode {
  steamId: string;
  matchCode: string;
}
