import { tgUsersRepository } from "src/db/tgUsersRepository";
import { ConstMessages } from "src/enums/constMessages";
import { UserDataFields } from "src/enums/steamDataFields";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import {
  ADD_BOT_TO_FRIEND_LIST,
  BACK,
} from "src/services/keyboards/menuKeyboards";
import { getEnv } from "src/utils/getEnv";
import { isSteamConnected } from "src/utils/blockchainRequests";
import { getIdFromLink } from "src/utils/steamUrlHelpers";

export const steamLinkConnectionHandler = async (
  chatId: number,
  userMessage: string
) => {
  const steamId = await getIdFromLink(userMessage);
  if (!steamId) {
    return await telegramBot.sendMessage(chatId, ConstMessages.IncorrectUrl);
  }
  await tgUsersRepository.updateField(chatId, UserDataFields.steamId, steamId);
  await tgUsersRepository.updateField(
    chatId,
    UserDataFields.steamUrl,
    userMessage
  );
  const isAlreadyConnected = await isSteamConnected(steamId);
  if (isAlreadyConnected) {
    await tgUsersRepository.updateState(
      UserStates.WaitingForPasswordInput,
      chatId
    );
    return await telegramBot.sendMessage(
      chatId,
      `${ConstMessages.RequestPassword}`,
      {
        reply_markup: {
          keyboard: BACK.menu,
        },
      }
    );
  }
  await tgUsersRepository.updateState(
    UserStates.SteamConnectAddBotToFriendList,
    chatId
  );
  return await telegramBot.sendMessage(
    chatId,
    `${ConstMessages.LinkConnected}. ${
      ConstMessages.SendFriendRequest
    } ${getEnv("STEAM_BOT_PROFILE_LINK")}`,
    {
      reply_markup: {
        keyboard: ADD_BOT_TO_FRIEND_LIST.menu,
      },
    }
  );
};
