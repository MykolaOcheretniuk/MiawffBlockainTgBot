import { BUTTONS } from "../keyboards/buttons";
import { backToMenu } from "./steam/handleBackToMenu";
import { steamLinkConnectionHandler } from "./steam/handleSteamLinkConnection";

export const steamLinkConnection = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.BACK.text: {
      return await backToMenu(chatId);
    }
    default: {
      return await steamLinkConnectionHandler(chatId, userMessage);
    }
  }
};
