import telegramBot from "src/services/bot";

export const postGameResultSender = async (
  userId: number,
  numberOfCoins: number
) => {
  const message = `GG WP! Your reward is arrived! Total: ${numberOfCoins} Coins`;
  await telegramBot.sendMessage(userId, message);
};
