import {
  AUTH_DATA_KEY,
  EventType,
  INVALID_CHARS_TEXT,
  INVALID_LETTER_TEXT,
  LOGIN_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  errorsNames,
} from '../../../common/js/constants';

import { AuthData, LoginResponse, LogoutResponse, ServerResponse } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { connectionService } from '../../services/connection-service/connection-service';
import { storageService } from '../../services/storage-service/storage-service';
import { ErrorModalBlock } from '../../view/error-modal-block/error-modal-block';

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
    const authData: AuthData | null = storageService.getData<AuthData>(AUTH_DATA_KEY);

    if (!authData || !authData.login || !authData.password) {
      this.removeStorageAuthData();
      return;
    }

    const loginError: string = this.validateInput(authData.login, LOGIN_MIN_LENGTH);
    const passwordError: string = this.validateInput(authData.password, PASSWORD_MIN_LENGTH);

    if (loginError || passwordError) {
      this.removeStorageAuthData();
      return;
    }

    this.login(authData);
  }

  async login(authData: AuthData): Promise<void> {
    const response: ServerResponse<LoginResponse> = await connectionService.login(authData);

    if (response.type === EventType.error) {
      const modalWindow = new ErrorModalBlock({
        message: { title: errorsNames.authorizationError, text: response.payload.error },
      });

      modalWindow.open();
      return;
    }

    storageService.saveData(AUTH_DATA_KEY, authData);
    appModel.login.setValue(authData.login);
    appModel.password.setValue(authData.password);
  }

  async logout(): Promise<void> {
    const login: string | null = appModel.login.getValue();
    const password: string | null = appModel.password.getValue();

    if (login === null || password === null) return;
    this.removeAppAuthData();
    this.removeStorageAuthData();

    const response: ServerResponse<LogoutResponse> = await connectionService.logout({
      login,
      password,
    });

    if (response.type === EventType.error) {
      const modalWindow = new ErrorModalBlock({
        message: { title: errorsNames.authorizationError, text: response.payload.error },
      });

      modalWindow.open();
    }
  }

  removeStorageAuthData(): void {
    storageService.removeData(AUTH_DATA_KEY);
  }

  removeAppAuthData(): void {
    appModel.login.setValue(null);
    appModel.password.setValue(null);
  }
}

export const authController = new AuthController();
