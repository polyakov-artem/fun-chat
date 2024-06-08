import { classes } from '../../../common/js/constants';
import { ChildComponentProps } from '../../../types/types';
import { Div } from '../div/div';
import { Paragraph } from '../paragraph/paragraph';

export class MessagesDivider extends Div {
  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messagesDivider);
    super(props);
    this.configure();
  }

  configure(): void {
    const textElement: Paragraph = new Paragraph({
      text: 'New messages',
      classNames: [classes.messagesDividerText],
    });

    this.appendComponents(textElement);
  }
}
