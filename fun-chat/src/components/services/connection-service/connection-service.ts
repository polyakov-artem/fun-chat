import {
  CONNECTION_CHECK_INTERVAL,
  EventType,
  SERVER_ADDRESS,
  SERVER_PORT,
  WebSocketReadyState,
  webServiceMessages,
} from '../../../common/js/constants';
import {
  AuthData,
  ClientRequest,
  ErrorResponse,
  LoginRequest,
  LoginResponse,
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

  closeConnection() {
    this.webSocket?.close();
  }

  autoConnect() {
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
