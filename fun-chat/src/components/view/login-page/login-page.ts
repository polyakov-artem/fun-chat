import { Page } from '../page/page';
import { classes } from '../../../common/js/constants';
import { LoginBlock } from '../login-block/login-block';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';

export class LoginPage extends Page {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.loginPage);
    super(props);
    this.configure();
  }

  configure(): void {
    const pageInner = new Div({
      classNames: [classes.pageInner, classes.pageInnerPlaceCenter, classes.container],
    });

    const loginBlock = new LoginBlock();
    pageInner.appendComponents(loginBlock);
    this.appendComponents(pageInner);
  }
}

export const loginPage = new LoginPage();
