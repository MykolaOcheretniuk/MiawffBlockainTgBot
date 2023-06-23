import { tgUsersRepository } from "src/db/tgUsersRepository";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
import { CreateTransactionRequest } from "src/model/user";
import telegramBot from "src/services/bot";
import {
  CONFIRM_PAYMENT,
  WALLET_EXPLORING,
} from "src/services/keyboards/menuKeyboards";
import { transactionsService } from "src/services/transactionsService";
import { usersService } from "src/services/usersService";

export const confirmPayment = async (chatId: number) => {
  const { currentPaymentInfo, walletPrivateKey, walletPublicKey } =
    (await usersService.getUserByChatId(chatId)) as TgUserModel;
  const { amount, toAddress } = JSON.parse(
    currentPaymentInfo as unknown as string
  );
  const request: CreateTransactionRequest = {
    fromAddress: walletPublicKey,
    toAddress: toAddress,
    privateKey: walletPrivateKey,
    amount: amount,
  };
  const transaction = transactionsService.createTransaction(request);
  return await telegramBot.sendMessage(
    chatId,
    `${JSON.stringify(transaction)}`,
    {
      reply_markup: {
        keyboard: CONFIRM_PAYMENT.menu,
      },
    }
  );
};
