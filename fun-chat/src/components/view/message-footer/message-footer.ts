import { classes } from '../../../common/js/constants';
import { MessageFooterProps } from '../../../types/types';
import { Div } from '../div/div';
import { Span } from '../span/span';

export class MessageFooter extends Div {
  constructor(props: MessageFooterProps) {
    props.classNames ??= [];
    props.classNames.push(classes.messageFooter);
    super(props);
    this.configure(props);
  }

  configure(props: MessageFooterProps): void {
    const { editedString, statusString }: MessageFooterProps = props;
    const edited = new Span({ text: editedString });
    const status = new Span({ text: statusString });

    this.appendComponents(edited, status);
  }
}
