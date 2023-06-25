import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { Alerts } from "src/model/payment";
import { TgUserModel } from "src/model/tgUser";
import { genWalletKeys } from "src/utils/ellipticFunctions";
import telegramBot from "./bot";

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
  notifyUser = async (alerts: Alerts) => {
    const { completedTransactions } = alerts;
    for (let i = 0; i < completedTransactions.length; i++) {
      const { amount, senderAddress, receiverAddress } =
        completedTransactions[i];
      const receiver = await tgUsersRepository.getUserByWallet(receiverAddress);
      if (!receiver) {
        throw Error("Incorrect alert");
      }
      let message = `GG WP! Your reward is ${amount} coins.`;
      if (senderAddress) {
        const sender = await tgUsersRepository.getUserByWallet(senderAddress);
        if (!sender) {
          throw Error("Incorrect alert");
        }
        const { steamUrl } = sender[0];
        message = `You received ${amount} coins. From ${steamUrl}`;
      }
      const { userId } = receiver[0];
      await telegramBot.sendMessage(userId, message);
    }
  };
}
export const usersService = new UsersService();
