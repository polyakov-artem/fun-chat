import { INVALID_CHARS_TEXT, INVALID_LETTER_TEXT } from '../../../common/js/constants';

export class AuthController {
  validateInput(value: string, minLength: number = 3): string {
    if (/[^a-zA-Z-]/g.test(value) || typeof value !== 'string') return INVALID_CHARS_TEXT;
    if (value.length <= 0 || value.length < minLength) return this.getInvalidLengthText(minLength);
    if (value[0] !== (value[0] as string).toUpperCase()) return INVALID_LETTER_TEXT;
    return '';
  }

  getInvalidLengthText(minLength: number) {
    return `The length must be at least ${minLength} characters`;
  }
}

export const authController = new AuthController();
