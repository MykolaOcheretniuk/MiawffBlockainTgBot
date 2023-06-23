import { BUTTONS } from "../../keyboards/buttons";
import { amountInput } from "./walletCommands/handleAmountInput";
import { cancelPayment } from "./walletCommands/handleCancelPayment";

export const handleAmountInput = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.CANCEL_PAYMENT.text: {
      return await cancelPayment(chatId);
    }
    default: {
      return await amountInput(chatId, userMessage);
    }
  }
};
