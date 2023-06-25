import { DynamoDB } from "aws-sdk";
import { UserDataFields } from "src/enums/steamDataFields";
import { UserStates } from "src/enums/userStates";
import { TgUserModel } from "src/model/tgUser";
class TgUsersRepository {
  private dbClient = new DynamoDB.DocumentClient();
  private table = "TgBotUsers";
  putUser = async (user: TgUserModel) => {
    await this.dbClient
      .put({
        TableName: this.table,
        Item: user,
      })
      .promise();
  };
  getAllActiveUsers = async () => {
    const scanResult = await this.dbClient
      .scan({
        TableName: this.table,
        FilterExpression: "isSteamConnected = :isSteamConnected",
        ExpressionAttributeValues: {
          ":isSteamConnected": true,
        },
      })
      .promise();
    return scanResult.Items;
  };
  getByChatId = async (userChatId: number) => {
    return await this.dbClient
      .get({
        TableName: this.table,
        Key: {
          userId: userChatId,
        },
      })
      .promise();
  };
  updateState = async (state: UserStates, userId: number) => {
    await this.dbClient
      .update({
        TableName: this.table,
        Key: {
          userId: userId,
        },
        UpdateExpression: "set currentState = :State",
        ExpressionAttributeValues: {
          ":State": state,
        },
      })
      .promise();
  };

  updateField = async (
    userId: number,
    field: UserDataFields,
    value: string
  ) => {
    await this.dbClient
      .update({
        TableName: this.table,
        Key: {
          userId: userId,
        },
        UpdateExpression: `set ${field} = :updateField`,
        ExpressionAttributeValues: {
          ":updateField": value,
        },
      })
      .promise();
  };
  setSteamConnection = async (userId: number, value: boolean) => {
    await this.dbClient
      .update({
        TableName: this.table,
        Key: {
          userId: userId,
        },
        UpdateExpression: "set isSteamConnected = :isSteamConnected",
        ExpressionAttributeValues: {
          ":isSteamConnected": value,
        },
      })
      .promise();
  };
  resetSteamData = async (userId: number) => {
    await this.dbClient
      .update({
        TableName: this.table,
        Key: {
          userId: userId,
        },
        UpdateExpression:
          "set lastCompetitiveMatchCode = :lastCompetitiveMatchCode, matchHistoryCode = :matchHistoryCode, steamId = :steamId,steamUrl = :steamUrl,isSteamConnected=:isSteamConnected",
        ExpressionAttributeValues: {
          ":lastCompetitiveMatchCode": null,
          ":matchHistoryCode": null,
          ":steamId": null,
          ":steamUrl": null,
          ":isSteamConnected": false,
        },
      })
      .promise();
  };
  getUserByWallet = async (walletAddress: string) => {
    const scanResult = await this.dbClient
      .scan({
        TableName: this.table,
        FilterExpression: "walletPublicKey = :walletPublicKey",
        ExpressionAttributeValues: {
          ":walletPublicKey": walletAddress,
        },
      })
      .promise();
    return scanResult.Items;
  };
}

export const tgUsersRepository = new TgUsersRepository();
