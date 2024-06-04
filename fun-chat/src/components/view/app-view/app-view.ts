import { LoginPage, loginPage } from '../login-page/login-page';

export class AppView {
  loginPage: LoginPage;

  constructor() {
    this.loginPage = loginPage;
    this.configure();
  }

  configure() {
    this.loginPage.redraw();
  }

}
export const appView = new AppView();
