import { tgUsersRepository } from "src/db/tgUsersRepository";
import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import { UNCONNECTED_USER } from "src/services/keyboards/mainMenuKeyboard";
import { usersService } from "src/services/usersService";

export const disconnect = async (chatId: number) => {
  const { isSteamConnected } = (await usersService.getUserByChatId(
    chatId
  )) as TgUserModel;
  if (!isSteamConnected) {
    return await telegramBot.sendMessage(chatId, `You are not connected`);
  }
  await tgUsersRepository.resetSteamData(chatId);
  return await telegramBot.sendMessage(chatId, `Disconnected`, {
    reply_markup: {
      keyboard: UNCONNECTED_USER.menu,
    },
  });
};
