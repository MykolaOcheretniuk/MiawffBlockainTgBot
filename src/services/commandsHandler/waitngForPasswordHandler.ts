import { BUTTONS } from "../keyboards/buttons";
import { handlePasswordInput } from "./blockchainCommands/handlePasswordInput";
import { backToMenu } from "./steam/handleBackToMenu";

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
