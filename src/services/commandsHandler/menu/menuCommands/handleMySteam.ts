import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import { usersService } from "src/services/usersService";

export const mySteam = async (chatId: number) => {
  const { steamUrl } = (await usersService.getUserByChatId(
    chatId
  )) as TgUserModel;
  if (!steamUrl) {
    throw Error("Incorrect user data");
  }
  return await telegramBot.sendMessage(
    chatId,
    `Current steam account :${steamUrl}`
  );
};
