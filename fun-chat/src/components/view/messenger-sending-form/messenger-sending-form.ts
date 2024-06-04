import { classes } from '../../../common/js/constants';
import { Form } from '../form/form';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Input } from '../input/input';
import { ChildComponentProps } from '../../../types/types';

export class MessengerSendingForm extends Form {
  input!: Input;

  sendBtn!: ButtonPrimary;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerTextForm);
    super(props);
    this.configure();
  }

  configure(): void {
    this.input = new Input({ attr: { disabled: 'true' } });
    this.sendBtn = new ButtonPrimary({ text: 'Send', isSmall: true, attr: { disabled: 'true' } });
    this.appendComponents(this.input, this.sendBtn);
  }
}
