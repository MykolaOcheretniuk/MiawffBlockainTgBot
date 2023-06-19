import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
} from "aws-lambda/trigger/api-gateway-proxy";
import { Message } from "node-telegram-bot-api";
import { botCommandHandler } from "src/services/commandsHandler/commandsHandler";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    if (event.body) {
      const message: Message = JSON.parse(event.body).message;
      await botCommandHandler.handleCommand(message);
    }
    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 400,
    };
  }
};
