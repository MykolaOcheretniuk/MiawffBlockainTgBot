import { csGoActivityChecker } from "src/services/csGoActivityChecker";
import { usersService } from "src/services/usersService";

export const handler = async () => {
  const activeUsers = await usersService.getAllActiveUsers();
  const requests = await csGoActivityChecker.processActiveUsers(activeUsers);
  return console.log(requests);
};
