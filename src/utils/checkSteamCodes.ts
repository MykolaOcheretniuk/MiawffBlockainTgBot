import axios from "axios";
import { getEnv } from "./getEnv";

export const fetchNextCode = async (
  historyCode: string,
  lastMatchCode: string,
  steamId: string
): Promise<string> => {
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
  return data.result.nextcode;
};
