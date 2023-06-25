import { csGoActivityChecker } from "src/services/csGoActivityChecker";
import { transactionsService } from "src/services/transactionsService";
import { usersService } from "src/services/usersService";
import { addTransactions } from "src/utils/blockchainRequests";

export const handler = async () => {
  const activeUsers = await usersService.getAllActiveUsers();
  const requests = await csGoActivityChecker.processActiveUsers(activeUsers);
  const transactions = transactionsService.createManyTransactions(requests);
  await addTransactions(transactions);
  return console.log(transactions);
};
