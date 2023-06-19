import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import { BACK, CONNECTED_USER } from "src/services/keyboards/mainMenuKeyboard";
import { usersService } from "src/services/usersService";
import { checkUserCredentials } from "src/utils/blockchainRequests";

export const handlePasswordInput = async (chatId: number, message: string) => {
  const { steamId } = (await usersService.getUserByChatId(
    chatId
  )) as TgUserModel;
  const isUserCredCorrect = await checkUserCredentials({
    steamId: steamId as string,
    password: message,
  });
  if (isUserCredCorrect) {
    await tgUsersRepository.setSteamConnection(chatId, true);
    await tgUsersRepository.updateState(UserStates.InMenu, chatId);
    return await telegramBot.sendMessage(chatId, "Welcome", {
      reply_markup: {
        keyboard: CONNECTED_USER.menu,
      },
    });
  }
  return await telegramBot.sendMessage(chatId, "Incorrect password", {
    reply_markup: {
      keyboard: BACK.menu,
    },
  });
};
