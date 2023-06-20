import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
import { SignInResponse } from "src/models/user";
import telegramBot from "src/services/bot";
import { BACK, CONNECTED_USER } from "src/services/keyboards/mainMenuKeyboard";
import { usersService } from "src/services/usersService";
import { signIn } from "src/utils/blockchainRequests";

export const handlePasswordInput = async (chatId: number, message: string) => {
  const { steamId } = (await usersService.getUserByChatId(
    chatId
  )) as TgUserModel;
  const userData: SignInResponse | boolean = await signIn({
    steamId: steamId as string,
    password: message,
  });
  if (userData) {
    const { matchHistoryAuthCode, latestMatchCode } =
      userData as SignInResponse;
    const user = (await usersService.getUserByChatId(chatId)) as TgUserModel;
    const updatedUser = Object.assign({}, user, {
      matchHistoryCode: matchHistoryAuthCode,
      lastCompetitiveMatchCode: latestMatchCode,
      isSteamConnected: true,
    });
    await tgUsersRepository.putUser(updatedUser);
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
