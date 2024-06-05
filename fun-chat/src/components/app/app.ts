import '../../common/css/normalize.css';
import '../../common/css/style.css';
import { AppController, appController } from '../controller/app-controller/app-controller';

import { AppView, appView } from '../view/app-view/app-view';

export class App {
  appView: AppView;

  appController: AppController;

  constructor() {
    this.appController = appController;
    this.appView = appView;
  }
}
