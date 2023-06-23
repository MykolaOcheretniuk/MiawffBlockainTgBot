import { ConstMessages } from "src/enums/constMessages";
import {
  CONNECTED_USER,
  UNCONNECTED_USER,
} from "src/services/keyboards/menuKeyboards";
import telegramBot from "../../../bot";
import { usersService } from "../../../usersService";

export const handleStart = async (chatId: number) => {
  const existingUser = await usersService.getUserByChatId(chatId);
  if (existingUser) {
    const { isSteamConnected } = existingUser;
    if (!isSteamConnected) {
      return await telegramBot.sendMessage(
        chatId,
        ConstMessages.WelcomeUnconnected,
        {
          reply_markup: {
            keyboard: UNCONNECTED_USER.menu,
          },
        }
      );
    }
    return await telegramBot.sendMessage(chatId, "Welcome back", {
      reply_markup: {
        keyboard: CONNECTED_USER.menu,
      },
    });
  }
};
