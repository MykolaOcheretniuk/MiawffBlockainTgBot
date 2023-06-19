import { BUTTONS } from "../keyboards/buttons";
import { help } from "./menuCommands/handleHelp";
import { backToMenu } from "./steam/handleBackToMenu";
import { handleHistoryCode } from "./steam/handleHisotryCode";

export const connectHistoryCodeHandler = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.BACK.text: {
      return await backToMenu(chatId);
    }
    case BUTTONS.HELP.text: {
      return await help(chatId);
    }
    default: {
      return await handleHistoryCode(chatId, userMessage);
    }
  }
};
