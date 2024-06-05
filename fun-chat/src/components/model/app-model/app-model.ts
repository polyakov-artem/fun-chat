import { Observable } from '../observable/observable';

export class AppModel {
  login: Observable<null | string>;

  password: Observable<null | string>;

  constructor() {
    this.login = new Observable<null | string>(null);
    this.password = new Observable<null | string>(null);
  }
}

export const appModel = new AppModel();
