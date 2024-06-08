import { appModel } from '../../model/app-model/app-model';
import {
  ConnectionService,
  connectionService,
} from '../../services/connection-service/connection-service';
import { StorageService, storageService } from '../../services/storage-service/storage-service';
import { AuthController, authController } from '../auth-controller/auth-controller';
import {
  MessengerController,
  messengerController,
} from '../messenger-controller/messenger-controller';

export class AppController {
  authController: AuthController;

  storageService: StorageService;

  connectionService: ConnectionService;

  messengerController: MessengerController;

  constructor() {
    this.authController = authController;
    this.storageService = storageService;
    this.connectionService = connectionService;
    this.messengerController = messengerController;
    this.addConnectionListeners();
    this.addModelListeners();
  }

  addConnectionListeners(): void {
    this.connectionService.addOnOpenCallback((): void => {
      appModel.isConnected.setValue(true);
    });

    this.connectionService.addOnCloseCallback((): void => {
      appModel.isConnected.setValue(false);
    });
  }

  addModelListeners(): void {
    this.addIsConnectedPropListeners();
    this.addLoginPropListeners();
    this.addAllUsersPropListeners();
    this.addSelectedUserPropListeners();
    this.addCurrentMessagesPropListeners();
    this.addAllUsersHistoryPropListeners();
  }

  addIsConnectedPropListeners(): void {
    appModel.isConnected.subscribe((isConnected: boolean): void => {
      if (isConnected) {
        this.authController.autoLogin();
        return;
      }

      this.authController.removeAppAuthData();
    });
  }

  addLoginPropListeners(): void {
    appModel.login.subscribe((): void => {
      this.messengerController.updateAllUsers();
    });
  }

  addAllUsersPropListeners(): void {
    appModel.allUsers.subscribe((): void => {
      this.messengerController.updateAllUsersHistory();
    });
  }

  addAllUsersHistoryPropListeners(): void {
    appModel.allUsersHistory.subscribe((): void => {
      this.messengerController.updateCurrentMessages();
    });
  }

  addSelectedUserPropListeners(): void {
    appModel.selectedUser.subscribe((): void => {
      this.messengerController.updateCurrentMessages();
    });
  }

  addCurrentMessagesPropListeners(): void {
    appModel.currentMessages.subscribe((): void => {
      this.messengerController.updateCurrentUnreadMessages();
    });
  }
}

export const appController = new AppController();
