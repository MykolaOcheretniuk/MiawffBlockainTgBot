import { BUTTONS } from "../../keyboards/buttons";
import { backToMenu } from "./menuCommands/handleBackToMenu";
import { handlePasswordInput } from "./menuCommands/handlePasswordInput";

export const waitingForPasswordInput = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.BACK.text: {
      return await backToMenu(chatId);
    }
    default: {
      return await handlePasswordInput(chatId, userMessage);
    }
  }
};
