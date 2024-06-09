import {
  MESSAGE_USER_ALIAS,
  attributes,
  classes,
  messageStatuses,
} from '../../../common/js/constants';
import { Component } from '../component/component';
import { MessageHeader } from '../message-header/message-header';
import { MessageFooter } from '../message-footer/message-footer';
import { appModel } from '../../model/app-model/app-model';
import { Message, MessageItemProps, MsgStatus } from '../../../types/types';
import { Div } from '../div/div';

export class MessageItem extends Component<'article'> {
  messageContent!: Div;

  id!: string;

  text!: string;

  receiver!: string;

  constructor(props: MessageItemProps) {
    props.classNames ??= [];
    props.classNames.push(classes.message);
    super({ ...props, tag: 'article' });
    this.configure(props);
  }

  configure(props: MessageItemProps) {
    const { datetime, from, to, id, status, text }: Message = props.message;
    const { isDelivered, isReaded, isEdited }: MsgStatus = status;
    this.id = id;
    this.text = text;
    this.receiver = to;
    const isOutcome: boolean = appModel.login.getValue() === from;
    const senderString: string = isOutcome ? MESSAGE_USER_ALIAS : from;
    const dateString: string = `${new Date(datetime).toLocaleDateString()}, ${new Date(datetime).toLocaleTimeString()}`;
    const editedString: string = isEdited ? messageStatuses.edited : '';

    let statusString = '';

    if (isOutcome) {
      statusString = messageStatuses.sended;
      isDelivered && (statusString = messageStatuses.delivered);
      isReaded && (statusString = messageStatuses.read);
    }

    isOutcome ? this.addClass(classes.messageOutcome) : this.addClass(classes.messageIncome);

    const header = new MessageHeader({ senderString, dateString, isOutcome });
    const footer = new MessageFooter({ editedString, statusString });
    this.messageContent = new Div({ text, classNames: [classes.messageContent] });
    this.appendComponents(header, this.messageContent, footer);
  }
}
