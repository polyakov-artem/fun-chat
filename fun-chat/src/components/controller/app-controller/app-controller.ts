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
  }

  addConnectionListeners() {
    this.connectionService.addOnOpenCallback(() => {
      appModel.isConnected.setValue(true);
    });

    this.connectionService.addOnCloseCallback(() => {
      appModel.isConnected.setValue(false);
    });
  }
}

export const appController = new AppController();
