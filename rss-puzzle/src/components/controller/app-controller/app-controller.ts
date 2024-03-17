import { AuthController } from '../auth-controller/auth-controller';

export class AppController {
  authController!: AuthController;
  init() {
    this.authController = new AuthController();
  }
}
