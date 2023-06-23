import { tgUsersRepository } from "src/db/tgUsersRepository";
import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import { UNCONNECTED_USER } from "src/services/keyboards/menuKeyboards";
import { usersService } from "src/services/usersService";
import { updateLastMatchCode } from "src/utils/blockchainRequests";

export const disconnect = async (chatId: number) => {
  const { isSteamConnected, lastCompetitiveMatchCode, steamId } =
    (await usersService.getUserByChatId(chatId)) as TgUserModel;
  if (!isSteamConnected) {
    return await telegramBot.sendMessage(chatId, `You are not connected`);
  }
  await updateLastMatchCode({
    steamId: steamId as string,
    matchCode: lastCompetitiveMatchCode as string,
  });
  await tgUsersRepository.resetSteamData(chatId);
  return await telegramBot.sendMessage(chatId, `Disconnected`, {
    reply_markup: {
      keyboard: UNCONNECTED_USER.menu,
    },
  });
};
