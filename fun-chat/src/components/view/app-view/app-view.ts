import { LoginPage, loginPage } from '../login-page/login-page';
import { MessengerPage, messengerPage } from '../messenger-page/messenger-page';
import { InfoPage, infoPage } from '../info-page/info-page';

export class AppView {
  loginPage: LoginPage;

  infoPage: InfoPage;

  messengerPage: MessengerPage;

  constructor() {
    this.loginPage = loginPage;
    this.messengerPage = messengerPage;
    this.infoPage = infoPage;
    this.configure();
  }

  configure() {
    this.messengerPage.redraw();
  }
}
export const appView = new AppView();
