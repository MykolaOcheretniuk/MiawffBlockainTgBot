import axios from "axios";
import { tgUsersRepository } from "src/db/tgUsersRepository";
import { ConstMessages } from "src/enums/constMessages";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import { BACK } from "src/services/keyboards/mainMenuKeyboard";
import { usersService } from "src/services/usersService";
import { getEnv } from "src/utils/getEnv";

export const checkFriendRequest = async (chatId: number) => {
  const user = await usersService.getUserByChatId(chatId);
  if (!user) {
    throw Error("User not found");
  }
  const { steamId } = user;
  const { data: isFriends } = await axios.post(
    getEnv("CHECK_FRIEND_REQUEST_URL") as string,
    {
      steamId: steamId,
    }
  );
  if (!isFriends) {
    return await telegramBot.sendMessage(
      chatId,
      `${ConstMessages.SendFriendRequest} ${getEnv("STEAM_BOT_PROFILE_LINK")}`,
      {
        reply_markup: {
          keyboard: BACK.menu,
        },
      }
    );
  }
  await tgUsersRepository.updateState(
    UserStates.SteamConnectMatchHistoryCode,
    chatId
  );
  return await telegramBot.sendMessage(
    chatId,
    `${ConstMessages.RequestMatchHistoryCode} ${ConstMessages.CsGoCodesSteamUrl}`,
    {
      reply_markup: {
        keyboard: BACK.codes_menu,
      },
    }
  );
};
