import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import { PAYMENT_MENU } from "src/services/keyboards/menuKeyboards";

export const sendCoins = async (chatId: number) => {
  await tgUsersRepository.updateState(
    UserStates.WaitingReceiverAddressInput,
    chatId
  );
  return await telegramBot.sendMessage(
    chatId,
    `Input receivers wallet address.`,
    {
      reply_markup: {
        keyboard: PAYMENT_MENU.menu,
      },
    }
  );
};
