import { Page } from '../page/page';
import { classes } from '../../../common/js/constants';
import { Messenger } from '../messenger/messenger';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';

export class MessengerPage extends Page {
  messenger!: Messenger;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerPage);
    super(props);
    this.configure();
  }

  configure() {
    const pageInner = new Div({
      classNames: [classes.pageInner, classes.pageInnerPlaceCenter, classes.container],
    });

    this.messenger = new Messenger();
    pageInner.appendComponents(this.messenger);
    this.appendComponents(pageInner);
  }
}

export const messengerPage = new MessengerPage();
