import { classSelectors, classes, historyPlaceholders } from '../../../common/js/constants';
import { Paragraph } from '../paragraph/paragraph';
import { Div } from '../div/div';
import { ChildComponentProps, Message, RegisteredUser } from '../../../types/types';
import { appModel } from '../../model/app-model/app-model';
import { MessageItem } from '../message-item/message-item';
import { MessagesDivider } from '../messages-divider/messages-divider';
import { Component } from '../component/component';
import { messengerController } from '../../controller/messenger-controller/messenger-controller';

export class MessengerHistoryContent extends Div {
  selectUserPlaceholder!: Paragraph;

  writeMessagePlaceholder!: Paragraph;

  autoScrolling: boolean = false;

  dividerIsAdded: boolean = false;

  messageDivider?: MessagesDivider;

  constructor(props: ChildComponentProps = {}) {
    props.classNames ??= [];
    props.classNames.push(classes.messengerHistoryContent);
    super(props);
    this.configure();

    this.addModelListeners();
    this.addListeners();
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
    appModel.currentMessages.subscribe((): void => {
      this.update();
    });

    appModel.selectedUser.subscribe((): void => {
      this.update();
    });
  }

  addListeners(): void {
    this.addEventListener('scrollend', (): void => {
      this.autoScrolling = false;
    });

    this.addEventListener('click', (e: Event): void => {
      this.handleClick(e);
    });

    this.addEventListener('scroll', (): void => {
      this.handleScroll();
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
    this.scrollView();
  }

  addMessages(messages: Message[]): void {
    this.dividerIsAdded = false;
    const currentLogin = appModel.login.getValue();

    messages.forEach((message: Message): void => {
      if (!this.dividerIsAdded && !message.status.isReaded && message.to === currentLogin) {
        this.messageDivider = new MessagesDivider();
        this.appendComponents(this.messageDivider);
        this.dividerIsAdded = true;
      }

      this.appendComponents(new MessageItem({ message }));
    });
  }

  scrollView(): void {
    this.autoScrolling = true;

    if (this.dividerIsAdded) {
      this.messageDivider?.node.scrollIntoView();
      return;
    }

    const childComponentsArrLength: number = this.childComponents.length;

    if (!childComponentsArrLength) return;

    (
      this.childComponents[childComponentsArrLength - 1] as Component<keyof HTMLElementTagNameMap>
    ).node.scrollIntoView();
  }

  handleClick(e: Event): void {
    messengerController.readCurrentMessages();
    if (!e.target) return;

    const messageItemNode = (e.target as HTMLElement).closest<MessageItem['node']>(
      classSelectors.message,
    );

    if (!messageItemNode) return;

    const { id, text, receiver } = messageItemNode.component as MessageItem;

    const deleteBtn = (e.target as HTMLElement).closest<HTMLButtonElement>(
      classSelectors.messageDeleteBtn,
    );

    if (deleteBtn) {
      messengerController.deleteMessage(id, receiver);
      return;
    }

    const editBtn = (e.target as HTMLElement).closest<HTMLButtonElement>(
      classSelectors.messageEditBtn,
    );

    if (editBtn) {
      messengerController.setEditableMessage({ id, text, receiver });
    }
  }

  handleScroll() {
    if (!this.autoScrolling) {
      messengerController.readCurrentMessages();
    }
  }
}
