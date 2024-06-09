import { LoginPage, loginPage } from '../login-page/login-page';
import { MessengerPage, messengerPage } from '../messenger-page/messenger-page';
import { InfoPage, infoPage } from '../info-page/info-page';
import { appModel } from '../../model/app-model/app-model';
import { ReconnectionModalBlock } from '../reconnection-modal-block/reconnection-modal-block';

export class AppView {
  loginPage: LoginPage;

  infoPage: InfoPage;

  messengerPage: MessengerPage;

  reconnectionModalBlock!: ReconnectionModalBlock;

  constructor() {
    this.loginPage = loginPage;
    this.messengerPage = messengerPage;
    this.infoPage = infoPage;
    this.configure();
    this.addModelListeners();
  }

  configure() {
    this.loginPage.redraw();
    this.reconnectionModalBlock = new ReconnectionModalBlock();
    if (!appModel.isConnected.getValue()) this.reconnectionModalBlock.open();
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

    appModel.isConnected.subscribe((isConnected: boolean): void => {
      if (isConnected) {
        this.reconnectionModalBlock.close();
        return;
      }

      this.reconnectionModalBlock.open();
    });
  }
}
export const appView = new AppView();
