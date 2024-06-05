import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { authController } from '../../controller/auth-controller/auth-controller';
import { appView } from '../app-view/app-view';
import { Button } from '../button/button';
import { Div } from '../div/div';
import { HeaderH1 } from '../header-h1/header-h1';
import { Span } from '../span/span';

export class MessengerHeader extends Div {
  userLogin!: Span;

  logoutBtn!: Button;

  infoBtn!: Button;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerHeader);
    super(props);
    this.configure();
    this.addListeners();
  }

  configure() {
    this.userLogin = new Span({
      text: 'User: ',
      classNames: [classes.messengerCurrentLogin, classes.h4],
    });

    const title = new HeaderH1({
      text: 'Fun chat',
      classNames: [classes.h1],
    });

    const buttonsWrap = new Div({
      classNames: [classes.messengerHeaderButtons],
    });

    this.logoutBtn = new Button({
      text: 'Logout',
      classNames: [classes.btnPrimary, classes.btnPrimarySmall],
    });

    this.infoBtn = new Button({
      text: 'About',
      classNames: [classes.btnPrimary, classes.btnPrimarySmall],
    });

    buttonsWrap.appendComponents(this.infoBtn, this.logoutBtn);
    this.appendComponents(this.userLogin, title, buttonsWrap);
  }

  addListeners() {
    this.logoutBtn.addEventListener('click', () => {
      authController.logout();
    });

    this.infoBtn.addEventListener('click', () => {
      appView.infoPage.redraw();
    });
  }
}
