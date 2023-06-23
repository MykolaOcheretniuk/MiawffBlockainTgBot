import { tgUsersRepository } from "src/db/tgUsersRepository";
import { TgUserModel } from "src/model/tgUser";
import { fetchNextCode } from "src/utils/checkSteamCodes";
import { getMatchStats } from "src/utils/requestsToSteamService";
import { UserDataFields } from "src/enums/steamDataFields";
import { postGameResultSender } from "src/utils/postGameResultSender";
import { CreateTransactionRequest } from "src/model/user";
class CsGoActivityChecker {
  processActiveUsers = async (users: TgUserModel[]) => {
    const newArray = users.reduce(
      async (acc: Promise<CreateTransactionRequest[]>, user) => {
        const {
          steamId,
          matchHistoryCode,
          lastCompetitiveMatchCode,
          userId,
          walletPublicKey,
          walletPrivateKey,
        } = user;
        const code = await fetchNextCode(
          matchHistoryCode as string,
          lastCompetitiveMatchCode as string,
          steamId as string
        );
        const accumulator = await acc;
        if (code !== "n/a") {
          await tgUsersRepository.updateField(
            userId,
            UserDataFields.lastCompetitiveMatchCode,
            code
          );
          const kills = await getMatchStats(steamId as string, code);
          await postGameResultSender(userId, kills);
          accumulator.push({
            toAddress: walletPublicKey,
            amount: kills,
            fromAddress: null,
            privateKey: walletPrivateKey,
          });
        }
        return accumulator;
      },
      Promise.resolve([])
    );
    return newArray;
  };
}

export const csGoActivityChecker = new CsGoActivityChecker();
