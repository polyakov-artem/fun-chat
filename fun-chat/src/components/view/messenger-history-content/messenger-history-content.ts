import { classes, historyPlaceholders } from '../../../common/js/constants';
import { Paragraph } from '../paragraph/paragraph';
import { Div } from '../div/div';
import { ChildComponentProps } from '../../../types/types';

export class MessengerHistoryContent extends Div {
  selectUserPlaceholder!: Paragraph;

  writeMessagePlaceholder!: Paragraph;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerHistoryContent);
    super(props);
    this.configure();
  }

  configure() {
    this.selectUserPlaceholder = new Paragraph({
      classNames: [classes.messengerHistoryPlaceholder],
      text: historyPlaceholders.selectUser,
    });

    this.writeMessagePlaceholder = new Paragraph({
      classNames: [classes.messengerHistoryPlaceholder],
      text: historyPlaceholders.writeMessage,
    });

    this.appendComponents(this.selectUserPlaceholder);
  }
}
