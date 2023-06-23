import { CreateTransactionRequest } from "src/model/user";
import { SHA256 } from "crypto-js";
import { getPairFromPrivateKey } from "src/utils/ellipticFunctions";
import { Transaction } from "src/model/payment";
class TransactionsService {
  createTransaction = (data: CreateTransactionRequest): Transaction => {
    const { privateKey, toAddress, amount, fromAddress } = data;
    const transactionHash = this.getTransactionHash(data);
    const keys = getPairFromPrivateKey(privateKey);
    if (fromAddress !== keys.getPublic("hex")) {
      throw Error("Incorrect from address");
    }
    const signature = keys.sign(transactionHash, "base64");
    return Object.assign({}, data, {
      signature: signature.toDER("hex"),
      privateKey: undefined,
      toAddress: toAddress,
      amount: amount,
    });
  };
  createManyTransactions = (
    data: CreateTransactionRequest[]
  ): Transaction[] => {
    const transactions = data.reduce((requests: Transaction[], transaction) => {
      requests.push(this.createTransaction(transaction));
      return requests;
    }, []);
    return transactions;
  };
  private getTransactionHash = (data: CreateTransactionRequest): string => {
    const { fromAddress, toAddress, amount } = data;
    return SHA256(fromAddress + toAddress + amount).toString();
  };
}

export const transactionsService = new TransactionsService();
