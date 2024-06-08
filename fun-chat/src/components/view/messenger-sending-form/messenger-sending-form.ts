import { classes } from '../../../common/js/constants';
import { Form } from '../form/form';
import { ButtonPrimary } from '../button-primary/button-primary';
import { Input } from '../input/input';
import { ChildComponentProps, RegisteredUser } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { messengerController } from '../../controller/messenger-controller/messenger-controller';

export class MessengerSendingForm extends Form {
  input!: Input;

  sendBtn!: ButtonPrimary;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerTextForm);
    super(props);
    this.configure();
    this.addModelListeners();
    this.addEventListeners();
  }

  configure(): void {
    this.input = new Input({ attr: { disabled: 'true' } });
    this.sendBtn = new ButtonPrimary({ text: 'Send', isSmall: true, attr: { disabled: 'true' } });
    this.appendComponents(this.input, this.sendBtn);
  }

  addModelListeners(): void {
    appModel.selectedUser.subscribe((selectedUser: RegisteredUser | null): void => {
      this.update(selectedUser);
    });
  }

  addEventListeners(): void {
    this.addEventListener('submit', (e): boolean => {
      e.preventDefault();
      console.log('preventDefault');

      const text = this.input.node.value;
      messengerController.sendText(text);

      this.input.node.value = '';
      return false;
    });
  }

  update(selectedUser: RegisteredUser | null): void {
    this.input.node.value = '';

    if (selectedUser) {
      this.input.enable();
      this.sendBtn.enable();
      return;
    }

    this.input.disable();
    this.sendBtn.disable();
  }
}
