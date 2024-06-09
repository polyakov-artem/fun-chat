import { AllUsersHistory, EditableMessage, Message, RegisteredUser } from '../../../types/types';
import { Observable } from '../observable/observable';

export class AppModel {
  login: Observable<null | string>;

  password: Observable<null | string>;

  isConnected: Observable<boolean>;

  allUsers: Observable<RegisteredUser[] | null>;

  selectedUser: Observable<RegisteredUser | null>;

  allUsersHistory: Observable<AllUsersHistory | null>;

  currentMessages: Observable<Message[] | null>;

  currentUnreadMessages: Observable<Message[] | null>;

  editableMessage: Observable<EditableMessage | null>;

  constructor() {
    this.login = new Observable<null | string>(null);
    this.password = new Observable<null | string>(null);
    this.isConnected = new Observable<boolean>(false);
    this.allUsers = new Observable<RegisteredUser[] | null>(null);
    this.selectedUser = new Observable<null | RegisteredUser>(null);
    this.allUsersHistory = new Observable<AllUsersHistory | null>(null);
    this.currentMessages = new Observable<Message[] | null>(null);
    this.currentUnreadMessages = new Observable<Message[] | null>(null);
    this.editableMessage = new Observable<EditableMessage | null>(null);
  }
}

export const appModel = new AppModel();
