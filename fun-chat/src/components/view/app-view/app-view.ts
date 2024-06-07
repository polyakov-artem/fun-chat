import { LoginPage, loginPage } from '../login-page/login-page';
import { MessengerPage, messengerPage } from '../messenger-page/messenger-page';
import { InfoPage, infoPage } from '../info-page/info-page';
import { appModel } from '../../model/app-model/app-model';

export class AppView {
  loginPage: LoginPage;

  infoPage: InfoPage;

  messengerPage: MessengerPage;

  constructor() {
    this.loginPage = loginPage;
    this.messengerPage = messengerPage;
    this.infoPage = infoPage;
    this.configure();
    this.addModelListeners();
  }

  configure() {
    this.loginPage.redraw();
  }

  addModelListeners() {
    appModel.login.subscribe((login: string | null) => {
      if (login === null) {
        this.loginPage.redraw();
      } else {
        this.loginPage.loginBlock.loginForm.clearForm();
        this.messengerPage.redraw();
      }
    });
  }
}
export const appView = new AppView();
