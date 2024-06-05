import { StorageService, storageService } from '../../services/storage-service/storage-service';
import { AuthController, authController } from '../auth-controller/auth-controller';

export class AppController {
  authController: AuthController;

  storageService: StorageService;

  constructor() {
    this.authController = authController;
    this.storageService = storageService;
  }
}

export const appController = new AppController();
