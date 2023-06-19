export interface UserSignUpModel {
  steamId: string;
  matchHistoryAuthCode: string;
  latestMatchCode: string;
}

export interface SignInModel {
  steamId: string;
  password: string;
}
