import {
  AUTH_DATA_KEY,
  EventType,
  INVALID_CHARS_TEXT,
  INVALID_LETTER_TEXT,
  LOGIN_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../../../common/js/constants';

import { AuthData } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { connectionService } from '../../services/connection-service/connection-service';
import { storageService } from '../../services/storage-service/storage-service';

export class AuthController {
  validateInput(value: string, minLength: number = 3): string {
    if (/[^a-zA-Z-]/g.test(value) || typeof value !== 'string') return INVALID_CHARS_TEXT;
    if (value.length <= 0 || value.length < minLength) return this.getInvalidLengthText(minLength);
    if (value[0] !== (value[0] as string).toUpperCase()) return INVALID_LETTER_TEXT;
    return '';
  }

  getInvalidLengthText(minLength: number): string {
    return `The length must be at least ${minLength} characters`;
  }

  autoLogin(): void {
    const authData = storageService.getData<AuthData>(AUTH_DATA_KEY);

    if (!authData || !authData.login || !authData.password) {
      this.removeStorageAuthData();
      return;
    }

    const loginError = this.validateInput(authData.login, LOGIN_MIN_LENGTH);
    const passwordError = this.validateInput(authData.password, PASSWORD_MIN_LENGTH);

    if (loginError || passwordError) {
      this.removeStorageAuthData();
      return;
    }

    this.login(authData);
  }

  async login(authData: AuthData): Promise<void> {
    const response = await connectionService.login(authData);

    if (response.type === EventType.error) {
      return;
    }

    storageService.saveData(AUTH_DATA_KEY, authData);
    appModel.login.setValue(authData.login);
    appModel.password.setValue(authData.password);
  }

  logout(): void {
    const login = appModel.login.getValue();
    const password = appModel.password.getValue();

    this.removeAppAuthData();
    this.removeStorageAuthData();

    if (login === null || password === null) return;

    connectionService.logout({
      login,
      password,
    });
  }

  removeStorageAuthData(): void {
    storageService.removeData(AUTH_DATA_KEY);
  }

  removeAppAuthData() {
    appModel.login.setValue(null);
    appModel.password.setValue(null);
  }
}

export const authController = new AuthController();
