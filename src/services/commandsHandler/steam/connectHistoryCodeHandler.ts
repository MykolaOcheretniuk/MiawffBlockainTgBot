import { BUTTONS } from "../../keyboards/buttons";
import { backToMenu } from "../menu/menuCommands/handleBackToMenu";
import { help } from "../menu/menuCommands/handleHelp";
import { handleHistoryCode } from "./steamCommands/handleHisotryCode";

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
