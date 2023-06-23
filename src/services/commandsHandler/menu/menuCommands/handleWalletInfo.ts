import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import { WALLET_EXPLORING } from "src/services/keyboards/menuKeyboards";
import { usersService } from "src/services/usersService";
import { getWalletBalance } from "src/utils/blockchainRequests";

export const myWalletInfo = async (chatId: number) => {
  const { walletPublicKey } = (await usersService.getUserByChatId(
    chatId
  )) as TgUserModel;
  await tgUsersRepository.updateState(UserStates.WalletExploring, chatId);
  const walletBalance = await getWalletBalance(walletPublicKey);
  return await telegramBot.sendMessage(
    chatId,
    `Balance: ${walletBalance} \nYour address: ${walletPublicKey}`,
    {
      reply_markup: {
        keyboard: WALLET_EXPLORING.menu,
      },
    }
  );
};
