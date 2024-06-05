import '../../common/css/normalize.css';
import '../../common/css/style.css';
import { AppController, appController } from '../controller/app-controller/app-controller';

import { AppModel, appModel } from '../model/app-model/app-model';
import { AppView, appView } from '../view/app-view/app-view';

export class App {
  appView: AppView;

  appModel: AppModel;

  appController: AppController;

  constructor() {
    this.appModel = appModel;
    this.appController = appController;
    this.appView = appView;
    this.init();
  }

  init() {
    appController.authController.autoLogin();
  }
}
