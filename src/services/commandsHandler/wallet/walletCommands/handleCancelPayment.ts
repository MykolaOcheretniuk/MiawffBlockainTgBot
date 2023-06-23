import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import { WALLET_EXPLORING } from "src/services/keyboards/menuKeyboards";

export const cancelPayment = async (chatId: number) => {
  await tgUsersRepository.updateState(UserStates.WalletExploring, chatId);
  return await telegramBot.sendMessage(chatId, `Back`, {
    reply_markup: {
      keyboard: WALLET_EXPLORING.menu,
    },
  });
};
