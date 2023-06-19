import { EnvVariables } from "src/enums/envs";

export const getEnv = (envName: EnvVariables) => {
  return process.env[envName];
};
