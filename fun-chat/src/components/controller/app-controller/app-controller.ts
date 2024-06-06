import { appModel } from '../../model/app-model/app-model';
import {
  ConnectionService,
  connectionService,
} from '../../services/connection-service/connection-service';
import { StorageService, storageService } from '../../services/storage-service/storage-service';
import { AuthController, authController } from '../auth-controller/auth-controller';

export class AppController {
  authController: AuthController;

  storageService: StorageService;

  connectionService: ConnectionService;

  constructor() {
    this.authController = authController;
    this.storageService = storageService;
    this.connectionService = connectionService;
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
    this.addConnectionChangeListeners();
  }

  addConnectionChangeListeners() {
    appModel.isConnected.subscribe((isConnected) => {
      if (isConnected) {
        this.authController.autoLogin();
        return;
      }

      this.authController.removeAppAuthData();
    });
  }
}

export const appController = new AppController();
