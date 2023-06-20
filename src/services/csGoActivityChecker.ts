import { tgUsersRepository } from "src/db/tgUsersRepository";
import { TgUserModel } from "src/model/tgUser";
import { CreateBlockRequest } from "src/models/user";
import { fetchNextCode } from "src/utils/checkSteamCodes";
import { getMatchStats } from "src/utils/requestsToSteamService";
import { SteamDataFields } from "src/enums/steamDataFields";
import { postGameResultSender } from "src/utils/postGameResultSender";
class CsGoActivityChecker {
  processActiveUsers = async (users: TgUserModel[]) => {
    const newArray = users.reduce(
      async (acc: Promise<CreateBlockRequest[]>, user) => {
        const { steamId, matchHistoryCode, lastCompetitiveMatchCode, userId } =
          user;
        const code = await fetchNextCode(
          matchHistoryCode as string,
          lastCompetitiveMatchCode as string,
          steamId as string
        );
        const accumulator = await acc;
        if (code !== "n/a") {
          await tgUsersRepository.updateField(
            userId,
            SteamDataFields.lastCompetitiveMatchCode,
            code
          );
          const kills = await getMatchStats(
            steamId as string,
            lastCompetitiveMatchCode as string
          );
          await postGameResultSender(userId, kills);
          accumulator.push({ steamId: steamId as string, coins: kills });
        }
        return accumulator;
      },
      Promise.resolve([])
    );
    return newArray;
  };
}

export const csGoActivityChecker = new CsGoActivityChecker();
