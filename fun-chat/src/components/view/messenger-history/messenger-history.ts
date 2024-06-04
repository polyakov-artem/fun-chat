import { classes } from '../../../common/js/constants';
import { MessengerHistoryHeader } from '../messenger-history-header/messenger-history-header';
import { MessengerHistoryContent } from '../messenger-history-content/messenger-history-content';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';

export class MessengerHistory extends Div {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerHistory);
    super(props);
    this.configure();
  }

  configure() {
    const header = new MessengerHistoryHeader();
    const content = new MessengerHistoryContent();
    this.appendComponents(header, content);
  }
}
