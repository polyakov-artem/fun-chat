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

  addConnectionListeners() {
    this.connectionService.addOnOpenCallback(() => {
      appModel.isConnected.setValue(true);
    });

    this.connectionService.addOnCloseCallback(() => {
      appModel.isConnected.setValue(false);
    });
  }

  addModelListeners() {
    this.addIsConnectedPropListeners();
    this.addLoginPropListeners();
  }

  addIsConnectedPropListeners() {
    appModel.isConnected.subscribe((isConnected) => {
      if (isConnected) {
        this.authController.autoLogin();
        return;
      }

      this.authController.removeAppAuthData();
    });
  }

  addLoginPropListeners() {
    appModel.login.subscribe(() => {
      this.messengerController.updateAllUsers();
    });
  }
}

export const appController = new AppController();
