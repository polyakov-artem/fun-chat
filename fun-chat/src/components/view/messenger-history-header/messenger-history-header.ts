import { classes, userStatuses } from '../../../common/js/constants';
import { ChildComponentProps, RegisteredUser } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { Div } from '../div/div';
import { Span } from '../span/span';

export class MessengerHistoryHeader extends Div {
  Interlocutor!: Span;

  InterlocutorStatus!: Span;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerHistoryHeader);
    super(props);

    this.configure();
    this.addModelListeners();
  }

  addModelListeners(): void {
    appModel.selectedUser.subscribe((selectedUser: RegisteredUser | null) => {
      this.update(selectedUser);
    });
  }

  configure(): void {
    this.Interlocutor = new Span({ classNames: [classes.interlocutor] });
    this.InterlocutorStatus = new Span({
      classNames: [classes.interlocutorStatus],
    });

    this.appendComponents(this.Interlocutor, this.InterlocutorStatus);
  }

  update(selectedUser: RegisteredUser | null): void {
    let statusText = '';

    if (!selectedUser) {
      this.Interlocutor.setTextContent('');
      this.InterlocutorStatus.setTextContent(statusText);
      return;
    }

    if (selectedUser.isLogined) {
      statusText = userStatuses.online;
      this.InterlocutorStatus.addClass(classes.InterlocutorStatusActive);
    } else {
      statusText = userStatuses.offline;
      this.InterlocutorStatus.removeClass(classes.InterlocutorStatusActive);
    }

    this.Interlocutor.setTextContent(`Receiver: ${selectedUser.login}`);
    this.InterlocutorStatus.setTextContent(statusText);
  }
}
