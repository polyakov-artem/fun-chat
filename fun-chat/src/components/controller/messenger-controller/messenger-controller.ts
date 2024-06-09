import { EventType } from '../../../common/js/constants';
import {
  ActiveUsersResponse,
  AllUsersHistory,
  EditableMessage,
  GetMsgResponse,
  InActiveUsersResponse,
  Message,
  RegisteredUser,
  ServerResponse,
  UserHistory,
} from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { connectionService } from '../../services/connection-service/connection-service';

export class MessengerController {
  async sendText(text: string): Promise<void> {
    const selectedUser = appModel.selectedUser.getValue();

    if (!text || !selectedUser) return;

    await connectionService.sendText(selectedUser.login, text);

    const unreadMessages: Message[] | null = appModel.currentUnreadMessages.getValue();

    if (unreadMessages) {
      this.readCurrentMessages();
    } else {
      this.updateSelectedUserHistory(selectedUser.login);
    }
  }

  async updateAllUsers(): Promise<void> {
    const currentLogin: string | null = appModel.login.getValue();

    if (!currentLogin) {
      appModel.allUsers.setValue(null);
      return;
    }

    const activeUsersResponse: ServerResponse<ActiveUsersResponse> =
      await connectionService.getActiveUsers();

    const inActiveUsersResponse: ServerResponse<InActiveUsersResponse> =
      await connectionService.getInactiveUsers();

    if (
      activeUsersResponse.type === EventType.error ||
      inActiveUsersResponse.type === EventType.error
    ) {
      return;
    }

    const inActiveUsers: RegisteredUser[] = inActiveUsersResponse.payload.users;
    const activeUsers: RegisteredUser[] = activeUsersResponse.payload.users.filter(
      (user) => user.login !== currentLogin,
    );

    appModel.allUsers.setValue([...activeUsers, ...inActiveUsers]);
  }

  async updateAllUsersHistory(): Promise<void> {
    const allUsers: RegisteredUser[] | null = appModel.allUsers.getValue();

    if (!allUsers) {
      appModel.allUsersHistory.setValue(null);
      return;
    }

    const allUsersHistoryPromises: Promise<UserHistory>[] = allUsers.map((user) =>
      this.getMessagesWithUser(user.login),
    );

    const allUsersHistory: AllUsersHistory = await Promise.all(allUsersHistoryPromises);
    appModel.allUsersHistory.setValue(allUsersHistory);
  }

  updateCurrentMessages(): void {
    const selectedUser: RegisteredUser | null = appModel.selectedUser.getValue();
    const allUsersHistory: AllUsersHistory | null = appModel.allUsersHistory.getValue();

    if (!selectedUser || !allUsersHistory) {
      appModel.currentMessages.setValue(null);
      return;
    }

    const history: UserHistory | undefined = allUsersHistory.find(
      (userHistory) => userHistory.login === selectedUser.login,
    );

    history?.messages.length
      ? appModel.currentMessages.setValue(history.messages)
      : appModel.currentMessages.setValue(null);
  }

  updateCurrentUnreadMessages(): void {
    const currentMessages: Message[] | null = appModel.currentMessages.getValue();

    if (!currentMessages) {
      appModel.currentUnreadMessages.setValue(null);
      return;
    }

    const currentLogin: string | null = appModel.login.getValue();

    const unreadMessages: Message[] = currentMessages.filter((message: Message): boolean => {
      return message.to === currentLogin && message.status.isReaded === false;
    });

    unreadMessages.length
      ? appModel.currentUnreadMessages.setValue(unreadMessages)
      : appModel.currentUnreadMessages.setValue(null);
  }

  async readCurrentMessages(): Promise<void> {
    const unreadMessages: Message[] | null = appModel.currentUnreadMessages.getValue();
    const selectedUser: RegisteredUser | null = appModel.selectedUser.getValue();

    if (!unreadMessages || !unreadMessages.length || !selectedUser) return;

    await Promise.all(
      unreadMessages.map((message: Message) => connectionService.setStatusRead(message.id)),
    );

    this.updateSelectedUserHistory(selectedUser.login);
  }

  async updateSelectedUserHistory(login: string): Promise<void> {
    const userHistory: UserHistory = await this.getMessagesWithUser(login);

    const allUsersHistory: AllUsersHistory | null = appModel.allUsersHistory.getValue();
    if (!allUsersHistory) return;

    const updatedUsersHistory = allUsersHistory.map((history) => {
      if (history.login === userHistory.login) return userHistory;
      return history;
    });

    appModel.allUsersHistory.setValue(updatedUsersHistory);
  }

  async getMessagesWithUser(login: string): Promise<UserHistory> {
    const response: ServerResponse<GetMsgResponse> = await connectionService.getMessagesFrom(login);

    if (response.type === EventType.error) {
      return { login, messages: [] };
    }

    return { login, messages: response.payload.messages };
  }

  setSelectedUser(login: string | null): void {
    if (login === null) {
      appModel.selectedUser.setValue(null);
      return;
    }

    const selectedUser: RegisteredUser | undefined = appModel.allUsers
      .getValue()
      ?.find((user) => user.login === login);

    appModel.selectedUser.setValue(selectedUser || null);
  }

  async changeMsgText(id: string, text: string, receiver: string) {
    if (!id || !text || !receiver) return;

    this.setEditableMessage(null);
    await connectionService.changeText(id, text);
    this.updateSelectedUserHistory(receiver);
  }

  setEditableMessage(message: EditableMessage) {
    typeof message?.id === 'string' && typeof message?.text === 'string'
      ? appModel.editableMessage.setValue(message)
      : appModel.editableMessage.setValue(null);
  }

  async deleteMessage(id: string, receiver: string) {
    if (!id || !receiver) return;

    this.setEditableMessage(null);
    await connectionService.deleteMessage(id);
    this.updateSelectedUserHistory(receiver);
  }
}

export const messengerController = new MessengerController();
