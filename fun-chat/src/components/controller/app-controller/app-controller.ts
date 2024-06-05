import { AuthController, authController } from '../auth-controller/auth-controller';

export class AppController {
  authController: AuthController;

  constructor() {
    this.authController = authController;
  }
}

export const appController = new AppController();
