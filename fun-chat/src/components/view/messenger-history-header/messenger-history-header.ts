import { classes, userStatuses } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
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
  }

  configure() {
    this.Interlocutor = new Span({ text: 'Name', classNames: [classes.interlocutor] });

    this.InterlocutorStatus = new Span({
      text: userStatuses.online,
      classNames: [classes.interlocutorStatus],
    });

    this.appendComponents(this.Interlocutor, this.InterlocutorStatus);
  }
}
