import { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { usersService } from "src/services/usersService";

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  try {
    const activeUsers = await usersService.getAllActiveUsers();
    return {
      body: JSON.stringify(activeUsers),
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 400,
    };
  }
};
