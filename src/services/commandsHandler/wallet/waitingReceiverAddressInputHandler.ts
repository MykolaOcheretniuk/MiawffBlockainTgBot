import { BUTTONS } from "../../keyboards/buttons";
import { cancelPayment } from "./walletCommands/handleCancelPayment";
import { receiverAddressInputHandler } from "./walletCommands/handleInputReceiverAddress";

export const handleReceiverAddressInput = async (
  userMessage: string,
  chatId: number
) => {
  switch (userMessage) {
    case BUTTONS.CANCEL_PAYMENT.text: {
      return await cancelPayment(chatId);
    }
    default: {
      return await receiverAddressInputHandler(chatId, userMessage);
    }
  }
};
