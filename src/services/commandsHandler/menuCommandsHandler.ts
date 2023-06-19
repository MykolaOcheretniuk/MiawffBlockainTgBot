import { ConstMessages } from "src/enums/constMessages";
import telegramBot from "../bot";
import { BUTTONS } from "../keyboards/buttons";
import { steamConnect } from "./menuCommands/handleConnectSteam";
import { disconnect } from "./menuCommands/handleDisconnect";
import { mySteam } from "./menuCommands/handleMySteam";
import { handleStart } from "./menuCommands/handleStart";

export const handleMenuCommands = async (command: string, chatId: number) => {
  switch (command) {
    case "/start": {
      return await handleStart(chatId);
    }
    case BUTTONS.CONNECT.text: {
      return await steamConnect(chatId);
    }
    case BUTTONS.MY_STEAM.text: {
      return await mySteam(chatId);
    }
    case BUTTONS.DISCONNECT.text: {
      return await disconnect(chatId);
    }
    default: {
      return await telegramBot.sendMessage(
        chatId,
        ConstMessages.UnknownCommand
      );
    }
  }
};
