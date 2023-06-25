import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
} from "aws-lambda/trigger/api-gateway-proxy";
import { Alerts } from "src/model/payment";
import { usersService } from "src/services/usersService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  try {
    if (event.body) {
      const payload = JSON.parse(event.body) as unknown as Alerts;
      await usersService.notifyUser(payload);
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
