import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserDataFields } from "src/enums/steamDataFields";
import { UserStates } from "src/enums/userStates";
import { CurrentPaymentInfo } from "src/model/payment";
import telegramBot from "src/services/bot";
import { PAYMENT_MENU } from "src/services/keyboards/menuKeyboards";
import { validateUserInputAddress } from "src/utils/validateUserInputAddress";

export const receiverAddressInputHandler = async (
  chatId: number,
  message: string
) => {
  const isAddressValid = validateUserInputAddress(message);
  if (isAddressValid) {
    const paymentInfo: CurrentPaymentInfo = {
      amount: null,
      toAddress: message,
    };
    await tgUsersRepository.updateField(
      chatId,
      UserDataFields.currentPaymentInfo,
      JSON.stringify(paymentInfo)
    );
    await tgUsersRepository.updateState(UserStates.WaitingAmountInput, chatId);
    return await telegramBot.sendMessage(
      chatId,
      "Input amount of coins you want to send",{
        reply_markup: {
            keyboard: PAYMENT_MENU.menu,
          },
      }
    );
  }
  return await telegramBot.sendMessage(chatId, `Address you send is invalid`);
};
