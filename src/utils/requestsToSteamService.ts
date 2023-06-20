import axios from "axios";
import { getEnv } from "./getEnv";

export const getMatchStats = async (steamId: string, matchCode: string) => {
  const { data } = await axios.post(getEnv("GET_MATCH_STAT_URL") as string, {
    steamId,
    matchCode,
  });
  return data as number;
};
