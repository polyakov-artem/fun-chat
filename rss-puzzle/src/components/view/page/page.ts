import { LoginPage } from '../login-page/login-page';

export class Page {
  loginPage: LoginPage;
  constructor() {
    this.loginPage = new LoginPage();
  }
}
