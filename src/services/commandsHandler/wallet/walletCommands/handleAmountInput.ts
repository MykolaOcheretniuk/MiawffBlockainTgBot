import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserDataFields } from "src/enums/steamDataFields";
import { UserStates } from "src/enums/userStates";
import { CurrentPaymentInfo } from "src/model/payment";
import { TgUserModel } from "src/model/tgUser";
import telegramBot from "src/services/bot";
import {
  CONFIRM_PAYMENT,
  WALLET_EXPLORING,
} from "src/services/keyboards/menuKeyboards";
import { usersService } from "src/services/usersService";
import { getWalletBalance } from "src/utils/blockchainRequests";

export const amountInput = async (chatId: number, message: string) => {
  const { walletPublicKey, currentPaymentInfo } =
    (await usersService.getUserByChatId(chatId)) as TgUserModel;
  const balance = await getWalletBalance(walletPublicKey);
  if (balance < +message || balance <= 0) {
    await tgUsersRepository.updateState(UserStates.WalletExploring, chatId);
    return await telegramBot.sendMessage(
      chatId,
      `Your balance is not enough to complete transfer`,
      {
        reply_markup: {
          keyboard: WALLET_EXPLORING.menu,
        },
      }
    );
  }
  const { toAddress } = JSON.parse(currentPaymentInfo as unknown as string);
  const paymentInfo: CurrentPaymentInfo = {
    toAddress,
    amount: +message,
  };
  await tgUsersRepository.updateState(UserStates.ConfirmCoinsTransfer, chatId);
  await tgUsersRepository.updateField(
    chatId,
    UserDataFields.currentPaymentInfo,
    JSON.stringify(paymentInfo)
  );
  return await telegramBot.sendMessage(
    chatId,
    `Check your input and complete transfer \nAmount: ${message} coins\nTo: ${toAddress}`,
    {
      reply_markup: {
        keyboard: CONFIRM_PAYMENT.menu,
      },
    }
  );
};
