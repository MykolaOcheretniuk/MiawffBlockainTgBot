import { tgUsersRepository } from "src/db/tgUsersRepository";
import { ConstMessages } from "src/enums/constMessages";
import { UserStates } from "src/enums/userStates";
import { BACK } from "src/services/keyboards/mainMenuKeyboard";
import telegramBot from "../../bot";

export const steamConnect = async (chatId: number) => {
  await tgUsersRepository.updateState(UserStates.SteamConnectUserLink, chatId);
  return await telegramBot.sendMessage(
    chatId,
    ConstMessages.RequestProfileLink,
    {
      reply_markup: {
        keyboard: BACK.menu,
      },
    }
  );
};
