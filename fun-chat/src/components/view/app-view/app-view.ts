import { LoginPage, loginPage } from '../login-page/login-page';
import { InfoPage, infoPage } from '../info-page/info-page';

export class AppView {
  loginPage: LoginPage;

  infoPage: InfoPage;

  constructor() {
    this.loginPage = loginPage;
    this.infoPage = infoPage;
    this.configure();
  }

  configure() {
    this.infoPage.redraw();
  }
}
export const appView = new AppView();
