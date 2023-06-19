import axios from "axios";
import { getEnv } from "./getEnv";

export const checkCodes = async (
  historyCode: string,
  lastMatchCode: string,
  steamId: string
): Promise<boolean> => {
  try {
    const { data } = await axios.get(
      "https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1",
      {
        params: {
          key: getEnv("STEAM_WEB_API_KEY"),
          steamid: steamId,
          steamidkey: historyCode,
          knowncode: lastMatchCode,
        },
      }
    );
    if (data.result.nextcode === "n/a") {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
