import { ConstMessages } from "src/enums/constMessages";
import telegramBot from "src/services/bot";

export const help = async (chatId: number) => {
  return await telegramBot.sendMessage(chatId, ConstMessages.CodesConnectHelp);
};
