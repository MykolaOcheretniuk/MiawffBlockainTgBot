import TelegramBot, { SendGameOptions } from "node-telegram-bot-api";
class Bot {
  private bot: TelegramBot;
  constructor() {
    this.bot = new TelegramBot(process.env.TG_BOT_TOKEN as string);
  }
  sendMessage = async (
    chatId: number,
    text: string,
    options?: SendGameOptions
  ) => {
    await this.bot.sendMessage(chatId, text, options);
  };

}

const telegramBot = new Bot();
export default telegramBot;
