import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import { UNCONNECTED_USER } from "src/services/keyboards/mainMenuKeyboard";
export const backToMenu = async (chatId: number) => {
  await tgUsersRepository.updateState(UserStates.InMenu, chatId);
  await tgUsersRepository.resetSteamData(chatId);
  return await telegramBot.sendMessage(chatId, "Main menu", {
    reply_markup: {
      keyboard: UNCONNECTED_USER.menu,
    },
  });
};
