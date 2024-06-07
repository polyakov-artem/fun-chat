import { LOGIN_MIN_LENGTH, PASSWORD_MIN_LENGTH, classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Form } from '../form/form';
import { Label } from '../label/label';
import { Paragraph } from '../paragraph/paragraph';
import { ButtonPrimary } from '../button-primary/button-primary';
import { InputField } from '../input-field/input-field';
import { Input } from '../input/input';
import { authController } from '../../controller/auth-controller/auth-controller';
import { appModel } from '../../model/app-model/app-model';

export class LoginForm extends Form {
  loginField!: InputField;

  passwordField!: InputField;

  loginInput!: Input;

  passwordInput!: Input;

  loginValidationText!: Paragraph;

  passwordValidationText!: Paragraph;

  loginBtn!: ButtonPrimary;

  isValid: boolean = false;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.loginForm);
    super(props);

    this.configure();
    this.addListeners();
    this.addModelListeners();
  }

  configure(): void {
    const loginLabel = new Label({ text: 'Login', classNames: [classes.h4] });
    const passwordLabel = new Label({ text: 'Password', classNames: [classes.h4] });

    this.loginField = new InputField();
    this.passwordField = new InputField();

    this.loginInput = this.loginField.input;
    this.passwordInput = this.passwordField.input;

    this.loginValidationText = this.loginField.validationText;
    this.passwordValidationText = this.passwordField.validationText;

    this.loginBtn = new ButtonPrimary({
      text: 'Login',
      attr: { disabled: 'true' },
    });

    this.appendComponents(
      loginLabel,
      this.loginField,
      passwordLabel,
      this.passwordField,
      this.loginBtn,
    );
  }

  addListeners(): void {
    const validator = authController.validateInput.bind(authController);

    this.loginField.addValidator(validator, LOGIN_MIN_LENGTH);

    this.passwordField.addValidator(validator, PASSWORD_MIN_LENGTH);

    this.addEventListener('input', () => {
      if (this.loginField.isValid && this.passwordField.isValid) {
        this.isValid = true;
        this.loginBtn.enable();
      } else {
        this.loginBtn.disable();
        this.isValid = false;
      }
    });

    this.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!this.isValid) return false;

      authController.login({
        login: this.loginInput.node.value,
        password: this.passwordInput.node.value,
      });

      return false;
    });
  }

  addModelListeners() {
    appModel.login.subscribe((login: string | null) => {
      if (login !== null) {
        this.clearForm();
      }
    });
  }

  clearForm() {
    this.node.reset();
    this.loginBtn.disable();
  }
}
