import { Message } from "node-telegram-bot-api";
import { ConstMessages } from "src/enums/constMessages";
import { UserStates } from "src/enums/userStates";
import telegramBot from "../bot";
import { UNCONNECTED_USER } from "../keyboards/menuKeyboards";
import { usersService } from "../usersService";
import { addBotToFriendList } from "./steam/addBotToFriendListHandler";
import { connectHistoryCodeHandler } from "./steam/connectHistoryCodeHandler";
import { competitiveCodeHandler } from "./steam/competitiveCodeHandler";
import { handleMenuCommands } from "./menu/menuCommandsHandler";
import { steamLinkConnection } from "./steam/steamLinkConnectionHandler";
import { waitingForPasswordInput } from "./menu/waitingForPasswordHandler";
import { walletExploring } from "./wallet/walletExploringHandler";
import { handleReceiverAddressInput } from "./wallet/waitingReceiverAddressInputHandler";
import { handleAmountInput } from "./wallet/waitingAmountInputHandler";
import { handleConfirmTransfer } from "./wallet/confirmCoinsTransferHandler";
import { tgUsersRepository } from "src/db/tgUsersRepository";
import { backToMenu } from "./menu/menuCommands/handleBackToMenu";
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
    try {
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
        case UserStates.WalletExploring: {
          return await walletExploring(command, chatId);
        }
        case UserStates.WaitingReceiverAddressInput: {
          return await handleReceiverAddressInput(command, chatId);
        }
        case UserStates.WaitingAmountInput: {
          return await handleAmountInput(command, chatId);
        }
        case UserStates.ConfirmCoinsTransfer: {
          return await handleConfirmTransfer(command, chatId);
        }
      }
    } catch (err) {
      await tgUsersRepository.updateState(UserStates.InMenu, chatId);
      return await backToMenu(chatId);
    }
  };
}

export const botCommandHandler = new BotCommandHandler();
