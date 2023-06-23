import { BUTTONS } from "../../keyboards/buttons";
import { handlePasswordInput } from "../menu/menuCommands/handlePasswordInput";
import { backToMenu } from "../menu/menuCommands/handleBackToMenu";
import { sendCoins } from "./walletCommands/handleSendCoins";

export const walletExploring = async (userMessage: string, chatId: number) => {
  switch (userMessage) {
    case BUTTONS.BACK.text: {
      return await backToMenu(chatId);
    }
    case BUTTONS.SEND_COINS.text: {
      return await sendCoins(chatId);
    }
    default: {
      return await handlePasswordInput(chatId, userMessage);
    }
  }
};
