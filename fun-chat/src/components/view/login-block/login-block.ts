import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { appView } from '../app-view/app-view';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Div } from '../div/div';
import { LoginForm } from '../login-form/login-form';

export class LoginBlock extends Div {
  loginForm!: LoginForm;

  infoBtn!: ButtonPrimary;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.loginBlock, classes.window);
    super(props);
    this.configure();
    this.addListeners();
  }

  configure(): void {
    this.loginForm = new LoginForm();
    this.infoBtn = new ButtonPrimary({ text: 'About' });
    this.appendComponents(this.loginForm, this.infoBtn);
  }

  addListeners() {
    this.infoBtn.addEventListener('click', () => {
      appView.infoPage.redraw();
    });
  }
}
