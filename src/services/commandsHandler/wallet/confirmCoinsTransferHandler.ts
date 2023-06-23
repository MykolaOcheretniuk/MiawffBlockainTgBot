import { ConstMessages } from "src/enums/constMessages";
import telegramBot from "src/services/bot";
import { BUTTONS } from "../../keyboards/buttons";
import { cancelPayment } from "./walletCommands/handleCancelPayment";
import { confirmPayment } from "./walletCommands/handleConfirmPayment";

export const handleConfirmTransfer = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.CANCEL_PAYMENT.text: {
      return await cancelPayment(chatId);
    }
    case BUTTONS.CONFIRM_PAYMENT.text: {
      return await confirmPayment(chatId);
    }
    default: {
      return await telegramBot.sendMessage(
        chatId,
        ConstMessages.UnknownCommand
      );
    }
  }
};
