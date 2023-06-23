import { KeyboardButton } from "node-telegram-bot-api";
class Buttons {
  CONNECT: KeyboardButton = { text: "Connect Steam" };
  DISCONNECT: KeyboardButton = { text: "Disconnect Steam" };
  BACK: KeyboardButton = { text: "Back to menu" };
  CHECK_FRIEND_REQUEST: KeyboardButton = { text: "Check friend request" };
  MY_STEAM: KeyboardButton = { text: "My steam" };
  HELP: KeyboardButton = { text: "Help" };
  WALLET: KeyboardButton = { text: "Wallet" };
  SEND_COINS: KeyboardButton = { text: "Send coins" };
  CANCEL_PAYMENT: KeyboardButton = { text: "Cancel payment" };
  CONFIRM_PAYMENT: KeyboardButton = { text: "Confirm payment" };
}
export const BUTTONS = new Buttons();
