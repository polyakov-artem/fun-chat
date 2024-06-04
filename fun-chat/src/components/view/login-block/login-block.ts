import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Component } from '../component/component';
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
  }

  configure(): void {
    this.loginForm = new LoginForm();
    this.infoBtn = new ButtonPrimary({ text: 'About' });
    this.appendComponents(this.loginForm, this.infoBtn);
  }
}
