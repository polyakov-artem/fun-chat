import {
  AUTH_DATA_KEY,
  INVALID_CHARS_TEXT,
  INVALID_LETTER_TEXT,
} from '../../../common/js/constants';

import { AuthData } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
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
  login(authData: AuthData): void {
    storageService.saveData(AUTH_DATA_KEY, authData);
    appModel.login.setValue(authData.login);
    appModel.password.setValue(authData.password);
  }

  logout(): void {
    appModel.login.setValue(null);
    appModel.password.setValue(null);
    this.removeStorageAuthData();
  }

  removeStorageAuthData(): void {
    storageService.removeData(AUTH_DATA_KEY);
  }
}

export const authController = new AuthController();
