import { ConstMessages } from "src/enums/constMessages";
import telegramBot from "../../bot";
import { BUTTONS } from "../../keyboards/buttons";
import { backToMenu } from "../menu/menuCommands/handleBackToMenu";
import { checkFriendRequest } from "./steamCommands/handleCheckFriendRequest";

export const addBotToFriendList = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.CHECK_FRIEND_REQUEST.text: {
      return await checkFriendRequest(chatId);
    }
    case BUTTONS.BACK.text: {
      return await backToMenu(chatId);
    }
    default: {
      return await telegramBot.sendMessage(
        chatId,
        ConstMessages.UnknownCommand
      );
    }
  }
};
