import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
import { genWalletKeys } from "src/utils/ellipticFunctions";

class UsersService {
  createUser = async (chatId: number) => {
    const { publicKey, privateKey } = genWalletKeys();
    const botUser: TgUserModel = {
      currentState: UserStates.InMenu,
      userId: chatId,
      isSteamConnected: false,
      steamId: null,
      matchHistoryCode: null,
      lastCompetitiveMatchCode: null,
      steamUrl: null,
      walletPublicKey: publicKey,
      walletPrivateKey: privateKey,
      currentPaymentInfo: {
        amount: null,
        toAddress: null,
      },
    };
    await tgUsersRepository.putUser(botUser);
  };
  getUserByChatId = async (userId: number) => {
    const user = await tgUsersRepository.getByChatId(userId);
    if (user.Item) {
      return user.Item as TgUserModel;
    }
    return null;
  };
  getAllActiveUsers = async (): Promise<TgUserModel[]> => {
    const users =
      (await tgUsersRepository.getAllActiveUsers()) as TgUserModel[];
    return users;
  };
}
export const usersService = new UsersService();
