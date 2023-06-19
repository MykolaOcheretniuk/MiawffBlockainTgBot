import { KeyboardButton } from "node-telegram-bot-api";
class Buttons {
  CONNECT: KeyboardButton = { text: "Connect Steam" };
  DISCONNECT: KeyboardButton = { text: "Disconnect Steam" };
  BACK: KeyboardButton = { text: "Back to menu" };
  CHECK_FRIEND_REQUEST: KeyboardButton = { text: "Check friend request" };
  CONFIRM: KeyboardButton = { text: "Confirm" };
  MY_STEAM: KeyboardButton = { text: "My steam" };
  HELP: KeyboardButton = { text: "Help" };
}
export const BUTTONS = new Buttons();
