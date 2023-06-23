import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import {
  CONNECTED_USER,
  UNCONNECTED_USER,
} from "src/services/keyboards/menuKeyboards";
import { usersService } from "src/services/usersService";
export const backToMenu = async (chatId: number) => {
  const { isSteamConnected } = (await usersService.getUserByChatId(
    chatId
  )) as TgUserModel;
  let keyboard = {
    reply_markup: {
      keyboard: CONNECTED_USER.menu,
    },
  };
  if (!isSteamConnected) {
    await tgUsersRepository.resetSteamData(chatId);
    keyboard = {
      reply_markup: {
        keyboard: UNCONNECTED_USER.menu,
      },
    };
  }
  await tgUsersRepository.updateState(UserStates.InMenu, chatId);
  return await telegramBot.sendMessage(chatId, "Main menu", keyboard);
};
