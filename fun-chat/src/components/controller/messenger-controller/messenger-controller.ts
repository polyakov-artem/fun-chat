import { EventType } from '../../../common/js/constants';
import {
  ActiveUsersResponse,
  InActiveUsersResponse,
  RegisteredUser,
  ServerResponse,
} from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { connectionService } from '../../services/connection-service/connection-service';

export class MessengerController {
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
}

export const messengerController = new MessengerController();
