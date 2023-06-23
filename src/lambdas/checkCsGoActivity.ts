import { csGoActivityChecker } from "src/services/csGoActivityChecker";
import { transactionsService } from "src/services/transactionsService";
import { usersService } from "src/services/usersService";

export const handler = async () => {
  const activeUsers = await usersService.getAllActiveUsers();
  const requests = await csGoActivityChecker.processActiveUsers(activeUsers);
  const transactions = transactionsService.createManyTransactions(requests);
  return console.log(transactions);
};
