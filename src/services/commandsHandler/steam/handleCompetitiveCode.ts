import { tgUsersRepository } from "src/db/tgUsersRepository";
import { ConstMessages } from "src/enums/constMessages";
import { SteamDataFields } from "src/enums/steamDataFields";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import {
  CONNECTED_USER,
  UNCONNECTED_USER,
} from "src/services/keyboards/mainMenuKeyboard";
import { usersService } from "src/services/usersService";
import { createBlockchainUser } from "src/utils/blockchainRequests";
import { fetchNextCode } from "src/utils/checkSteamCodes";

export const handleCompetitiveCode = async (
  chatId: number,
  command: string
) => {
  const user = await usersService.getUserByChatId(chatId);
  if (!user) {
    throw Error("User not found");
  }
  await tgUsersRepository.updateField(
    chatId,
    SteamDataFields.lastCompetitiveMatchCode,
    command.replace(/ /g, "")
  );
  const { steamId, matchHistoryCode } = user;
  const nextCode = await fetchNextCode(
    matchHistoryCode as string,
    command,
    steamId as string
  );
  await tgUsersRepository.updateState(UserStates.InMenu, chatId);
  if (nextCode === "n/a") {
    const { steamId, matchHistoryCode } = user;
    const { password } = await createBlockchainUser({
      steamId: steamId as string,
      matchHistoryAuthCode: matchHistoryCode as string,
      latestMatchCode: command,
    });
    await tgUsersRepository.setSteamConnection(chatId, true);
    return await telegramBot.sendMessage(
      chatId,
      `You successfully registered!Your password: ${password} `,
      {
        reply_markup: {
          keyboard: CONNECTED_USER.menu,
        },
      }
    );
  }
  return await telegramBot.sendMessage(chatId, ConstMessages.InvalidCodes, {
    reply_markup: {
      keyboard: UNCONNECTED_USER.menu,
    },
  });
};
