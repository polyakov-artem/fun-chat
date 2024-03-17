import {
  INVALID_CHARS,
  INVALID_FIRST_LETTER,
  INVALID_NAME_LENGTH,
  INVALID_SURNAME_LENGTH,
} from '../../../common/js/constants';

export class AuthController {
  validateName(name: string = ''): string {
    if (/[^a-zA-Z-]/g.test(name)) return INVALID_CHARS;
    if (name.length < 3) return INVALID_NAME_LENGTH;
    if (name[0] !== name[0].toUpperCase()) return INVALID_FIRST_LETTER;
    return '';
  }

  validateSurname(surname: string = ''): string {
    if (/[^a-zA-Z-]/g.test(surname)) return INVALID_CHARS;
    if (surname.length < 4) return INVALID_SURNAME_LENGTH;
    if (surname[0] !== surname[0].toUpperCase()) return INVALID_FIRST_LETTER;
    return '';
  }
}
