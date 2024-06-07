import {
  CONNECTION_CHECK_INTERVAL,
  EventType,
  SERVER_ADDRESS,
  SERVER_PORT,
  WebSocketReadyState,
  webServiceMessages,
} from '../../../common/js/constants';
import {
  ActiveUsersRequest,
  ActiveUsersResponse,
  AuthData,
  ClientRequest,
  DeleteMsgRequest,
  DeleteMsgResponse,
  EditMsgRequest,
  EditMsgResponse,
  ErrorResponse,
  GetMsgRequest,
  GetMsgResponse,
  InActiveUsersResponse,
  InactiveUsersRequest,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  ReadMsgRequest,
  ReadMsgResponse,
  SendMsgRequest,
  SendMsgResponse,
  ServerNormalResponse,
  ServerNotice,
  ServerResponse,
  Task,
  WebSocketCb,
} from '../../../types/types';

export class ConnectionService {
  webSocket: WebSocket | null;

  requestNumber: number;

  tasksMap: Map<string, Task<ServerResponse>>;

  timer: NodeJS.Timeout | null;

  openCb?: WebSocketCb;

  closeCb?: WebSocketCb;

  errorCb?: WebSocketCb;

  constructor() {
    this.webSocket = null;
    this.tasksMap = new Map();
    this.requestNumber = 0;
    this.timer = null;
  }

  get requestId(): string {
    const number = this.requestNumber;
    this.requestNumber += 1;
    return `${number}`;
  }

  addOnOpenCallback(openCb: WebSocketCb) {
    this.openCb = openCb;
  }

  addOnCloseCallback(closeCb: WebSocketCb) {
    this.closeCb = closeCb;
  }

  addOnErrorCallback(errorCb: WebSocketCb) {
    this.errorCb = errorCb;
  }

  closeConnection(): void {
    this.webSocket?.close();
  }

  autoConnect(): void {
    this.connect();

    this.timer = setInterval(() => {
      if (!this.webSocket) {
        this.connect();
      }
    }, CONNECTION_CHECK_INTERVAL);
  }

  connect(): void {
    this.webSocket = new WebSocket(`ws://${SERVER_ADDRESS}:${SERVER_PORT}`);

    this.webSocket.onopen = (e: Event): void => {
      if (this.webSocket?.readyState === WebSocketReadyState.open) {
        console.log(webServiceMessages.onOpen);
        this.openCb?.(e);
      }
    };

    this.webSocket.onclose = (e: Event): void => {
      console.log(webServiceMessages.onClose);
      this.webSocket = null;
      this.closeCb?.(e);
    };

    this.webSocket.onerror = (e: Event): void => {
      console.warn(webServiceMessages.connectionError);
      this.errorCb?.(e);
    };

    this.webSocket.onmessage = (e: MessageEvent): void => {
      this.handleWebsocketMessage(e);
    };
  }

  handleWebsocketMessage(e: MessageEvent): void {
    const receivedDataStr = e?.data;

    if (!receivedDataStr) {
      console.warn(webServiceMessages.noDataInResponse, e);
      return;
    }

    const receivedData = JSON.parse(receivedDataStr);

    if (receivedData.id) {
      this.handleResponse(receivedData);
      return;
    }

    this.handleNotice(receivedData);
  }

  handleResponse(response: ServerResponse): void {
    const task = this.tasksMap.get(response.id);
    if (!task) return;

    task.resolve(response);
    this.tasksMap.delete(response.id);
  }

  handleNotice(notice: ServerNotice): void {}

  login(authData: AuthData): Promise<ServerResponse<LoginResponse>> {
    const request: LoginRequest = {
      id: this.requestId,
      type: EventType.userLogin,
      payload: {
        user: authData,
      },
    };
    return this.sendRequest<LoginResponse>(request);
  }

  logout(authData: AuthData): Promise<ServerResponse<LogoutResponse>> {
    this.clearTasks();

    const request: LogoutRequest = {
      id: this.requestId,
      type: EventType.userLogout,
      payload: {
        user: authData,
      },
    };

    return this.sendRequest<LogoutResponse>(request);
  }

  clearTasks(): void {
    const previousTasksMap = new Map(this.tasksMap);
    this.tasksMap.clear();

    [...previousTasksMap].forEach(([id, task]) => {
      task.resolve({
        id,
        type: EventType.error,
        payload: {
          error: webServiceMessages.taskAborted,
        },
      });
    });
  }

  getActiveUsers(): Promise<ServerResponse<ActiveUsersResponse>> {
    const request: ActiveUsersRequest = {
      id: this.requestId,
      type: EventType.userActive,
      payload: null,
    };

    return this.sendRequest<ActiveUsersResponse>(request);
  }

  getInactiveUsers(): Promise<ServerResponse<InActiveUsersResponse>> {
    const request: InactiveUsersRequest = {
      id: this.requestId,
      type: EventType.userInactive,
      payload: null,
    };

    return this.sendRequest<InActiveUsersResponse>(request);
  }

  getMessagesFrom(login: string): Promise<ServerResponse<GetMsgResponse>> {
    const request: GetMsgRequest = {
      id: this.requestId,
      type: EventType.msgFromUser,
      payload: {
        user: {
          login,
        },
      },
    };

    return this.sendRequest<GetMsgResponse>(request);
  }

  sendText(to: string, text: string): Promise<ServerResponse<SendMsgResponse>> {
    const request: SendMsgRequest = {
      id: this.requestId,
      type: EventType.msgSend,
      payload: {
        message: {
          to,
          text,
        },
      },
    };

    return this.sendRequest<SendMsgResponse>(request);
  }

  setStatusRead(id: string): Promise<ServerResponse<ReadMsgResponse>> {
    const request: ReadMsgRequest = {
      id: this.requestId,
      type: EventType.msgRead,
      payload: {
        message: {
          id,
        },
      },
    };

    return this.sendRequest<ReadMsgResponse>(request);
  }

  deleteMessage(id: string): Promise<ServerResponse<DeleteMsgResponse>> {
    const request: DeleteMsgRequest = {
      id: this.requestId,
      type: EventType.msgDelete,
      payload: {
        message: {
          id,
        },
      },
    };

    return this.sendRequest<DeleteMsgResponse>(request);
  }

  changeText(id: string, text: string): Promise<ServerResponse<EditMsgResponse>> {
    const request: EditMsgRequest = {
      id: this.requestId,
      type: EventType.msgEdit,
      payload: {
        message: {
          id,
          text,
        },
      },
    };

    return this.sendRequest<EditMsgResponse>(request);
  }

  sendRequest<T extends ServerNormalResponse>(request: ClientRequest): Promise<ServerResponse<T>> {
    if (!this.webSocket || this.webSocket.readyState !== WebSocketReadyState.open) {
      return Promise.resolve({
        id: request.id,
        type: EventType.error,
        payload: {
          error: webServiceMessages.noConnection,
        },
      }) satisfies Promise<ErrorResponse>;
    }

    const task = {} as Task<ServerResponse<T>>;

    const promise = new Promise<ServerResponse<T>>((resolve) => {
      task.resolve = resolve;
    });

    task.promise = promise;

    this.tasksMap.set(request.id, task as Task<ServerResponse>);
    this.webSocket.send(JSON.stringify(request));

    return task.promise;
  }
}

export const connectionService = new ConnectionService();
