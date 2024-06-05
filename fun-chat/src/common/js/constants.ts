export const classes = {
  btn: 'btn',
  btnPrimary: 'btn-primary',
  btnPrimarySmall: 'btn-primary_small',
  btnPrimaryExtraSmall: 'btn-primary_extra-small',
  btnSecondary: 'btn-secondary',
  btnSecondarySmall: 'btn-secondary_small',
  input: 'input',
  container: 'container',
  inputField: 'input-field',
  inputFieldInvalid: 'input-field_invalid',
  inputFieldControl: 'input-field__control',
  inputFieldMessage: 'input-field__message',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  header: 'header',
  loginBlock: 'login-block',
  loginForm: 'login-form',
  loginPage: 'login-page',
  loginPageInner: 'login-page__inner',
  messengerPage: 'messenger-page',
  messenger: 'messenger',
  messengerHeader: 'messenger-header',
  messengerHeaderButtons: 'messenger-header__buttons',
  messengerFooter: 'messenger-footer',
  messengerHistory: 'messenger-history',
  messengerHistoryHeader: 'messenger-history__header',
  messengerHistoryContent: 'messenger-history__content',
  interlocutor: 'interlocutor',
  interlocutorStatus: 'interlocutor-status',
  InterlocutorStatusActive: 'interlocutor-status_active',
  messengerUsers: 'messenger-users',
  messengerCurrentLogin: 'messenger__current-login',
  messengerTitle: 'messenger__title',
  messengerTextForm: 'messenger-text-form',
  page: 'page',
  pageInner: 'page__inner',
  pageInnerPlaceCenter: 'page__inner_place-center',
  infoPage: 'info-page',
  infoBlock: 'info-block',
  InfoBlockReturnBtn: 'info-block__return-btn',
  window: 'window',
  usersList: 'users-list',
  usersItem: 'users-item',
  usersItemActive: 'users-item_active',
  usersItemSelected: 'users-item_selected',
  usersItemHidden: 'users-item_hidden',
  usersListWrap: 'users-list-wrap',
  list: 'list',
  badge: 'badge',
  message: 'message',
  messageButtonsWrap: 'message__buttons-wrap',
  messageIncome: 'message_income',
  messageOutcome: 'message_outcome',
  messageHeader: 'message__header',
  messageContent: 'message__content',
  messageFooter: 'message__footer',
  messagesDivider: 'messages-divider',
  messagesDividerText: 'messages-divider__text',
  messageSender: 'message__sender',
  messageDeleteBtn: 'message__delete-btn',
  messageEditBtn: 'message__edit-btn',
  modalBlock: 'modal-block',
  modalBlockActive: 'modal-block_active',
  backdrop: 'backdrop',
  backdropActive: 'backdrop_active',
  modalWindow: 'modal-window',
  modalWindowTitle: 'modal-window__title',
  modalWindowText: 'modal-window__text',
  modalWindowContentWrap: 'modal-window__content-wrap',
  loaderBlock: 'loader-block',
  loader: 'loader',
  logo: 'logo',
  messengerFooterLogo: 'messenger-footer__logo',
  messengerHistoryPlaceholder: 'messenger-history__placeholder',
  notFoundPage: 'not-found-page',
};

export const classSelectors = (Object.keys(classes) as (keyof typeof classes)[]).reduce(
  (acc, key) => {
    acc[key] = `.${classes[key]}`;
    return acc;
  },
  {} as typeof classes,
);

export const ABOUT_APP_TEXT =
  'The application is designed to demonstrate the Fun Chat task as part of the RSSchool JavaScript/Front-end 2023Q4 course';

export const historyPlaceholders = {
  selectUser: 'Select a user to chat with...',
  writeMessage: 'Write your first message...',
};

export const userStatuses = {
  online: 'Online',
  offline: 'Offline',
};

export const LOGIN_MIN_LENGTH = 3;
export const PASSWORD_MIN_LENGTH = 4;

export const INVALID_CHARS_TEXT = `Only english letters or "-" are allowable`;
export const INVALID_LETTER_TEXT = 'First letter must be in uppercase';

export const STORAGE_KEY = 'fun-chat';
export const AUTH_DATA_KEY = 'saved-user';

export enum EventType {
  userLogin = 'USER_LOGIN',
  error = 'ERROR',
  userLogout = 'USER_LOGOUT',
  userExternalLogin = 'USER_EXTERNAL_LOGIN',
  userExternalLogout = 'USER_EXTERNAL_LOGOUT',
  userActive = 'USER_ACTIVE',
  userInactive = 'USER_INACTIVE',
  msgSend = 'MSG_SEND',
  msgFromUser = 'MSG_FROM_USER',
  msgDeliver = 'MSG_DELIVER',
  msgRead = 'MSG_READ',
  msgDelete = 'MSG_DELETE',
  msgEdit = 'MSG_EDIT',
}
