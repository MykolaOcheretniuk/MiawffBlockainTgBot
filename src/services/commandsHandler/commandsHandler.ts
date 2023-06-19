import { Message } from "node-telegram-bot-api";
import { ConstMessages } from "src/enums/constMessages";
import { UserStates } from "src/enums/userStates";
import telegramBot from "../bot";
import { UNCONNECTED_USER } from "../keyboards/mainMenuKeyboard";
import { usersService } from "../usersService";
import { addBotToFriendList } from "./addBotToFriendListHandler";
import { connectHistoryCodeHandler } from "./connectHistoryCodeHandler";
import { competitiveCodeHandler } from "./competitiveCodeHandler";
import { handleMenuCommands } from "./menuCommandsHandler";
import { steamLinkConnection } from "./steamLinkConnectionHandler";
import { waitingForPasswordInput } from "./waitngForPasswordHandler";
class BotCommandHandler {
  handleCommand = async (message: Message) => {
    const { id: chatId } = message.chat;
    const command = message.text as string;
    const existingUser = await usersService.getUserByChatId(chatId);
    if (!existingUser) {
      await usersService.createUser(chatId);
      return telegramBot.sendMessage(chatId, ConstMessages.WelcomeUnconnected, {
        reply_markup: {
          keyboard: UNCONNECTED_USER.menu,
        },
      });
    }
    const { currentState: state } = existingUser;
    switch (state) {
      case UserStates.InMenu: {
        return await handleMenuCommands(command, chatId);
      }
      case UserStates.SteamConnectUserLink: {
        return await steamLinkConnection(command, chatId);
      }
      case UserStates.SteamConnectAddBotToFriendList: {
        return await addBotToFriendList(command, chatId);
      }
      case UserStates.SteamConnectMatchHistoryCode: {
        return await connectHistoryCodeHandler(command, chatId);
      }
      case UserStates.SteamConnectLastCompetitiveMatchCode: {
        return await competitiveCodeHandler(command, chatId);
      }
      case UserStates.WaitingForPasswordInput: {
        return await waitingForPasswordInput(command, chatId);
      }
    }
  };
}

export const botCommandHandler = new BotCommandHandler();
