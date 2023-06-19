import { tgUsersRepository } from "src/db/tgUsersRepository";
import { ConstMessages } from "src/enums/constMessages";
import { SteamDataFields } from "src/enums/steamDataFields";
import { UserStates } from "src/enums/userStates";
import telegramBot from "src/services/bot";
import { BACK } from "src/services/keyboards/mainMenuKeyboard";

export const handleHistoryCode = async (
  chatId: number,
  userMessage: string
) => {
  await tgUsersRepository.updateState(
    UserStates.SteamConnectLastCompetitiveMatchCode,
    chatId
  );
  await tgUsersRepository.updateField(
    chatId,
    SteamDataFields.matchHistoryCode,
    userMessage.replace(/ /g, "")
  );
  return await telegramBot.sendMessage(
    chatId,
    `${ConstMessages.RequestCompetitiveMatchCode}: ${ConstMessages.CsGoCodesSteamUrl}`,
    {
      reply_markup: {
        keyboard: BACK.codes_menu,
      },
    }
  );
};
