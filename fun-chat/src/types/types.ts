import { EventType } from '../common/js/constants';

export type BaseExchange<IdType extends string | null, EType extends EventType, Payload> = {
  id: IdType;
  type: EType;
  payload: Payload;
};

export type ErrorResponse = BaseExchange<string, EventType.error, { error: string }>;

export type LoginExchange<Payload> = BaseExchange<string, EventType.userLogin, Payload>;

export type AuthPayload = {
  user: {
    login: string;
    password: string;
  };
};

export type LoginRequest = LoginExchange<AuthPayload>;

export type RegisteredUser = {
  login: string;
  isLogined: boolean;
};

export type LoginResponse = LoginExchange<RegisteredUser>;

export type LogoutExchange<Payload> = BaseExchange<string, EventType.userLogout, Payload>;

export type LogoutRequest = LogoutExchange<AuthPayload>;

export type LogoutResponse = LogoutExchange<RegisteredUser>;

export type ExternalAuthNotice<EType extends EventType> = BaseExchange<null, EType, RegisteredUser>;

export type ExternalLoginNotice = ExternalAuthNotice<EventType.userExternalLogin>;
export type ExternalLogoutNotice = ExternalAuthNotice<EventType.userExternalLogout>;

export type ActiveUsersExchange<Payload> = BaseExchange<string, EventType.userActive, Payload>;
export type ActiveUsersRequest = ActiveUsersExchange<null>;
export type ActiveUsersResponse = ActiveUsersExchange<UsersPayload>;

export type UsersPayload = {
  users: RegisteredUser[];
};

export type InactiveUsersExchange<Payload> = BaseExchange<string, EventType.userInactive, Payload>;
export type InactiveUsersRequest = InactiveUsersExchange<null>;
export type InActiveUsersResponse = ActiveUsersExchange<UsersPayload>;

export type SendMsgExchange<IdType extends string | null, Payload> = BaseExchange<
  IdType,
  EventType.msgSend,
  Payload
>;

export type SendMsgRequest = SendMsgExchange<string, SendMsgRequestPayload>;

export type SendMsgRequestPayload = {
  message: {
    to: string;
    text: string;
  };
};

export type SendMsgResponse = SendMsgExchange<string, SendMsgResponsePayload>;

export type SendMsgResponsePayload = {
  message: Message;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MsgStatus;
};

export type MsgStatus = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
};

export type DeletedMsgStatus = {
  isDeleted: boolean;
};

export type SendMsgRecipientNotice = SendMsgExchange<null, SendMsgResponsePayload>;

export type GetMsgExchange<Payload> = BaseExchange<string, EventType.msgFromUser, Payload>;

export type GetMsgRequest = GetMsgExchange<GetMsgRequestPayload>;

export type GetMsgRequestPayload = {
  user: {
    login: string;
  };
};

export type GetMsgResponse = GetMsgExchange<GetMsgResponsePayload>;

export type GetMsgResponsePayload = {
  messages: Message[];
};

export type DeliveredMsgNotice = BaseExchange<null, EventType.msgDeliver, DeliveredMsgPayload>;

export type ChangedMsgPayload<Status> = {
  message: {
    id: string;
    status: Status;
  };
};

export type DeliveredMsgPayload = ChangedMsgPayload<Pick<MsgStatus, 'isDelivered'>>;

export type ReadMsgExchange<IdType extends string | null, Payload> = BaseExchange<
  IdType,
  EventType.msgRead,
  Payload
>;

export type ReadMsgRequest = ReadMsgExchange<string, MsgIdPayload>;

export type MsgIdPayload = {
  message: {
    id: string;
  };
};

export type ReadMsgResponse = ReadMsgExchange<string, ReadMsgResponsePayload>;
export type ReadMsgResponsePayload = ChangedMsgPayload<Pick<MsgStatus, 'isReaded'>>;

export type ReadMsgNotice = ReadMsgExchange<null, ReadMsgResponsePayload>;

export type DeleteMsgExchange<IdType extends string | null, Payload> = BaseExchange<
  IdType,
  EventType.msgDelete,
  Payload
>;

export type DeleteMsgRequest = DeleteMsgExchange<string, MsgIdPayload>;

export type DeleteMsgResponse = DeleteMsgExchange<string, DeleteMsgResponsePayload>;
export type DeleteMsgResponsePayload = ChangedMsgPayload<DeletedMsgStatus>;

export type DeleteMsgNotice = DeleteMsgExchange<null, DeleteMsgResponsePayload>;

export type EditMsgExchange<IdType extends string | null, Payload> = BaseExchange<
  IdType,
  EventType.msgEdit,
  Payload
>;

export type EditMsgRequest = EditMsgExchange<string, MsgEditRequestPayload>;

export type MsgEditRequestPayload = {
  message: {
    id: string;
    text: string;
  };
};

export type EditMsgResponse = EditMsgExchange<string, EditMsgResponsePayload>;
export type EditMsgResponsePayload = ChangedMsgPayload<Pick<MsgStatus, 'isEdited'>>;

export type EditMsgNotice = EditMsgExchange<null, DeleteMsgResponsePayload>;

export type ClientRequest =
  | LoginRequest
  | LogoutRequest
  | ActiveUsersRequest
  | InactiveUsersRequest
  | SendMsgRequest
  | GetMsgRequest
  | ReadMsgRequest
  | DeleteMsgRequest
  | EditMsgRequest;

export type ServerNormalResponse =
  | LoginResponse
  | LogoutResponse
  | ActiveUsersResponse
  | InActiveUsersResponse
  | SendMsgResponse
  | GetMsgResponse
  | ReadMsgResponse
  | DeleteMsgResponse
  | EditMsgResponse;

export type ServerNotice =
  | ExternalLoginNotice
  | ExternalLogoutNotice
  | SendMsgRecipientNotice
  | DeliveredMsgNotice
  | DeleteMsgNotice
  | EditMsgNotice;

export type ServerResponse<T extends ServerNormalResponse = ServerNormalResponse> =
  | T
  | ErrorResponse;

export type ComponentProps<Tag extends DocTag> = {
  tag: Tag;
  classNames?: string[];
  text?: string;
  attr?: Record<string, string>;
};

export type ChildComponentProps = Omit<ComponentProps<'div'>, 'tag'>;
export type ButtonComponentProps = ChildComponentProps & {
  isSmall?: boolean;
  isExtraSmall?: boolean;
};

export type DocTag = keyof HTMLElementTagNameMap;

export type MultipleValuesVoidFn<T> = (...args: [T]) => void;
export type SingleValueVoidFn<T> = (value: T) => void;

export type AuthData = { login: string; password: string };

export type Task<T extends ServerResponse> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
};

export type WebSocketCb = SingleValueVoidFn<Event>;

export type UsersItemProps = ChildComponentProps & {
  isLogined: boolean;
  isHidden: boolean;
  isSelected: boolean;
  numOfUnread: number;
};

export type UpdateUsersListOptions = {
  users: RegisteredUser[] | null;
  allUsersHistory: AllUsersHistory | null;
  filterText: string;
  selectedUser: RegisteredUser | null;
};

export type AllUsersHistory = UserHistory[];

export type UserHistory = {
  login: string;
  messages: Message[];
};

export type MessageItemProps = ChildComponentProps & {
  message: Message;
};

export type MessageFooterProps = ChildComponentProps & {
  editedString: string;
  statusString: string;
};

export type MessageHeaderProps = ChildComponentProps & {
  senderString: string;
  dateString: string;
  isOutcome: boolean;
};
