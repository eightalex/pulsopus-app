import { io, Socket } from "socket.io-client";
import { EUserSocketEvent } from './services';

export type ESocketEvent = string | EUserSocketEvent;

export class SocketService {
  private socket: Socket | null = null;
  private uri: string = '';

  public setUri(uri: string): void {
    this.uri = uri;
  }

  public connect(): void {
    debugger;
    if(!this.uri) return;
    const url = new URL(this.uri);
    const link = this.uri.replace(url.search, '');
    const params = new URLSearchParams(url.search);

    const query: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      query[key] = value;
    }

    this.socket = io(link, {
      query,
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });

    console.info(`Connecting to ${link}`);

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error', error);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('connect', () => {
      console.info(`Socket connected to server. Connection ID: ${this.socket?.id}`);
    });

    this.socket.on('disconnect', () => {
      console.info('Disconnected from server');
    });
  }

  public emit<Date extends object>(event: ESocketEvent, data: Date): void {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket not connected');
    }
  }

  // public on<Message extends object>(event: ESocketEvent, callback: (data: Message) => void): void {
  //   if (!this.socket) {
  //     console.error('Socket not connected');
  //     return;
  //   }
  //   this.socket.on(event, callback);
  // }

  public on(event: string, callback: (data: object) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.error('Socket not connected');
    }
  }

  public disconnect(): void {
    if(!this.connected) return;
    this.socket?.disconnect();
    console.info('Socket disconnected');
  }

  public destroy() {
    this.disconnect();
    this.socket = null;
  }

  public get connected(): boolean {
    return Boolean(this.socket?.connected);
  }
}

export default SocketService;