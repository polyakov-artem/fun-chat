import { classes, historyPlaceholders } from '../../../common/js/constants';
import { Paragraph } from '../paragraph/paragraph';
import { Div } from '../div/div';
import { ChildComponentProps, Message, RegisteredUser } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { MessageItem } from '../message-item/message-item';

export class MessengerHistoryContent extends Div {
  selectUserPlaceholder!: Paragraph;

  writeMessagePlaceholder!: Paragraph;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerHistoryContent);
    super(props);
    this.configure();

    this.addModelListeners();
  }

  configure(): void {
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

  addModelListeners(): void {
    appModel.currentMessages.subscribe(() => {
      this.update();
    });

    appModel.selectedUser.subscribe(() => {
      this.update();
    });
  }

  update(): void {
    this.removeComponents();

    const selectedUser: RegisteredUser | null = appModel.selectedUser.getValue();

    if (!selectedUser) {
      this.appendComponents(this.selectUserPlaceholder);
      return;
    }

    const messages: Message[] | null = appModel.currentMessages.getValue();

    if (!messages) {
      this.appendComponents(this.writeMessagePlaceholder);
      return;
    }

    this.addMessages(messages);
  }

  addMessages(messages: Message[]): void {
    messages.forEach((message: Message): void => {
      this.appendComponents(new MessageItem({ message }));
    });
  }
}
