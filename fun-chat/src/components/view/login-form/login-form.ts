import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Form } from '../form/form';
import { Label } from '../label/label';
import { Paragraph } from '../paragraph/paragraph';
import { ButtonPrimary } from '../button-primary/button-primary';
import { InputField } from '../input-field/input-field';
import { Input } from '../input/input';

export class LoginForm extends Form {
  loginField!: InputField;

  passwordField!: InputField;

  loginInput!: Input;

  passwordInput!: Input;

  loginValidationText!: Paragraph;

  passwordValidationText!: Paragraph;

  loginBtn!: ButtonPrimary;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.loginForm);
    super(props);

    this.configure();
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
}
