import axios from "axios";
import { getEnv } from "./getEnv";

export const getIdFromLink = async (link: string): Promise<string | null> => {
  const regex = /\/(id|profiles)\/([^/]+)/;
  const match = link.match(regex);
  let id = null;
  if (match) {
    if (match[1] === "id") {
      id = await getProfileId(match[2]);
    }
    if (match[1] === "profiles") {
      id = match[2];
    }
  }
  return id;
};

const getProfileId = async (id: string) => {
  const { data } = await axios.get(
    "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/",
    {
      params: {
        key: getEnv("STEAM_WEB_API_KEY"),
        vanityurl: id,
      },
    }
  );
  return data.response.steamid;
};
