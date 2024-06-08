import { classes } from '../../../common/js/constants';
import { MessageHeaderProps } from '../../../types/types';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Div } from '../div/div';
import { Span } from '../span/span';

export class MessageHeader extends Div {
  constructor(props: MessageHeaderProps) {
    props.classNames ??= [];
    props.classNames.push(classes.messageHeader);
    super(props);
    this.configure(props);
  }

  configure(props: MessageHeaderProps): void {
    const { senderString, dateString, isOutcome }: MessageHeaderProps = props;
    const sender = new Span({ text: senderString, classNames: [classes.messageSender] });
    const date = new Span({ text: dateString });

    if (isOutcome) {
      const buttonsWrap = new Div({ classNames: [classes.messageButtonsWrap] });

      const editBtn = new ButtonPrimary({
        text: 'Edit',
        isExtraSmall: true,
        classNames: [classes.messageEditBtn],
      });

      const deleteBtn = new ButtonPrimary({
        text: 'Delete',
        isExtraSmall: true,
        classNames: [classes.messageDeleteBtn],
      });

      buttonsWrap.appendComponents(editBtn, deleteBtn);
      this.appendComponents(buttonsWrap, sender, date);
      return;
    }

    this.appendComponents(sender, date);
  }
}
