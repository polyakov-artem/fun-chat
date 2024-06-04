import { classes } from '../../../common/js/constants';
import { MessengerFooter } from '../messenger-footer/messenger-footer';
import { MessengerHeader } from '../messenger-header/messenger-header';
import { MessengerHistory } from '../messenger-history/messenger-history';
import { MessengerUsers } from '../messenger-users/messenger-users';
import { MessengerSendingForm } from '../messenger-sending-form/messenger-sending-form';
import { Div } from '../div/div';
import { ChildComponentProps } from '../../../types/types';

export class Messenger extends Div {
  messengerHeader!: MessengerHeader;

  messengerFooter!: MessengerFooter;

  messengerHistory!: MessengerHistory;

  messengerUsers!: MessengerUsers;

  messengerForm!: MessengerSendingForm;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messenger, classes.window);
    super(props);
    this.configure();
  }

  configure() {
    this.messengerHeader = new MessengerHeader();
    this.messengerFooter = new MessengerFooter();
    this.messengerHistory = new MessengerHistory();
    this.messengerUsers = new MessengerUsers();
    this.messengerForm = new MessengerSendingForm();

    this.appendComponents(
      this.messengerHeader,
      this.messengerFooter,
      this.messengerHistory,
      this.messengerUsers,
      this.messengerForm,
    );
  }
}
