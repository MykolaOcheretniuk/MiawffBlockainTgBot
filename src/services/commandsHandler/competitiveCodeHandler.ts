import { BUTTONS } from "../keyboards/buttons";
import { help } from "./menuCommands/handleHelp";
import { backToMenu } from "./steam/handleBackToMenu";
import { handleCompetitiveCode } from "./steam/handleCompetitiveCode";

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
