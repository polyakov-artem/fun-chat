import { Observable } from '../observable/observable';

export class AppModel {
  login: Observable<null | string>;

  password: Observable<null | string>;

  isConnected: Observable<boolean>;

  constructor() {
    this.login = new Observable<null | string>(null);
    this.password = new Observable<null | string>(null);
    this.isConnected = new Observable<boolean>(false);
  }
}

export const appModel = new AppModel();
