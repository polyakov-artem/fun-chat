import { EventType } from '../../../common/js/constants';
import {
  ActiveUsersResponse,
  AllUsersHistory,
  GetMsgResponse,
  InActiveUsersResponse,
  RegisteredUser,
  ServerResponse,
  UserHistory,
} from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { connectionService } from '../../services/connection-service/connection-service';

export class MessengerController {
  async sendText(text: string) {
    const selectedUser = appModel.selectedUser.getValue();

    if (!text || !selectedUser) return;

    await connectionService.sendText(selectedUser.login, text);
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

  async getMessagesWithUser(login: string): Promise<UserHistory> {
    const response: ServerResponse<GetMsgResponse> = await connectionService.getMessagesFrom(login);

    if (response.type === EventType.error) {
      return { login, messages: [] };
    }

    return { login, messages: response.payload.messages };
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

  setSelectedUser(login: string | null) {
    const selectedUser: RegisteredUser | undefined = appModel.allUsers
      .getValue()
      ?.find((user) => user.login === login);

    appModel.selectedUser.setValue(selectedUser || null);
  }
}

export const messengerController = new MessengerController();
