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

  get requestId() {
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

  connect() {
    this.webSocket = new WebSocket(`ws://${SERVER_ADDRESS}:${SERVER_PORT}`);

    this.webSocket.onopen = (e: Event) => {
      if (this.webSocket?.readyState === WebSocketReadyState.open) {
        console.log(webServiceMessages.onOpen);
        this.openCb?.(e);
      }
    };

    this.webSocket.onclose = (e) => {
      console.log(webServiceMessages.onClose);
      this.webSocket = null;
      this.closeCb?.(e);
    };

    this.webSocket.onerror = (e) => {
      console.warn(webServiceMessages.connectionError);
      this.errorCb?.(e);
    };

    this.webSocket.onmessage = (e: MessageEvent) => {
      this.handleWebsocketMessage(e);
    };
  }

  handleWebsocketMessage(e: MessageEvent) {
  }
}

export const connectionService = new ConnectionService();
