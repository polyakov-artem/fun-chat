import '../../common/css/normalize.css';
import '../../common/css/style.css';
import { AppView, appView } from '../view/app-view/app-view';

export class App {
  appView: AppView;

  constructor() {
    this.appView = appView;
  }
}
