import { AppModel } from '../app-model/app-model';
import { AppView } from '../view/app-view/app-view';
import { AppController } from '../controller/app-controller/app-controller';
import '~common-css/normalize.css';
import '~common-css/style.css';

export class App {
  constructor() {
    this.init();
  }
  static appModel = new AppModel();
  static appView = new AppView();
  static appController = new AppController();
  init() {
    App.appView.init();
    App.appController.init();
    App.appView.page.loginPage.redraw();
  }
}
