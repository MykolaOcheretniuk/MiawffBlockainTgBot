import { BUTTONS } from "./buttons";

export const CONNECTED_USER = {
  menu: [[BUTTONS.MY_STEAM], [BUTTONS.WALLET], [BUTTONS.DISCONNECT]],
};
export const UNCONNECTED_USER = {
  menu: [[BUTTONS.CONNECT], [BUTTONS.WALLET]],
};

export const BACK = {
  menu: [[BUTTONS.BACK]],
  codes_menu: [[BUTTONS.HELP], [BUTTONS.BACK]],
};
export const ADD_BOT_TO_FRIEND_LIST = {
  menu: [[BUTTONS.CHECK_FRIEND_REQUEST], [BUTTONS.BACK]],
};

export const WALLET_EXPLORING = {
  menu: [[BUTTONS.SEND_COINS], [BUTTONS.BACK]],
};
export const CONFIRM_PAYMENT = {
  menu: [[BUTTONS.CONFIRM_PAYMENT, BUTTONS.CANCEL_PAYMENT]],
};
export const PAYMENT_MENU = {
  menu: [[BUTTONS.CANCEL_PAYMENT]],
};
