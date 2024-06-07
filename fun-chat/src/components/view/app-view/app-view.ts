import { LoginPage, loginPage } from '../login-page/login-page';
import { MessengerPage, messengerPage } from '../messenger-page/messenger-page';
import { InfoPage, infoPage } from '../info-page/info-page';
import { appModel } from '../../model/app-model/app-model';
import { RegisteredUser } from '../../../types/types';

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
      this.handleLoginPropChange(login);
    });

    appModel.allUsers.subscribe((allUsers: RegisteredUser[] | null) => {
      this.handleAllUsersPropChange(allUsers);
    });
  }

  handleAllUsersPropChange(allUsers: RegisteredUser[] | null) {
    this.messengerPage.messenger.messengerUsers.usersList.configure(allUsers);
  }

  handleLoginPropChange(login: string | null) {
    if (login === null) {
      this.loginPage.redraw();
    } else {
      this.loginPage.loginBlock.loginForm.clearForm();
      this.messengerPage.redraw();
    }

    this.messengerPage.messenger.messengerHeader.updateUserLogin(login || '');
  }
}
export const appView = new AppView();
