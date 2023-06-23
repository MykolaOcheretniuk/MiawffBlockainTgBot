import { BUTTONS } from "../../keyboards/buttons";
import { backToMenu } from "../menu/menuCommands/handleBackToMenu";
import { help } from "../menu/menuCommands/handleHelp";
import { handleCompetitiveCode } from "./steamCommands/handleCompetitiveCode";

export const competitiveCodeHandler = async (
  command: string,
  chatId: number
) => {
  switch (command) {
    case BUTTONS.BACK.text: {
      return await backToMenu(chatId);
    }
    case BUTTONS.HELP.text: {
      return await help(chatId);
    }
    default: {
      return await handleCompetitiveCode(chatId, command);
    }
  }
};
