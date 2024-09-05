import { io, Socket } from "socket.io-client";

export const enum ESocketEvent {
  CONNECT = 'CONNECT',
  DISCONNECT = 'DISCONNECT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  INSERT = 'INSERT',
  MESSAGE = 'MESSAGE',
  ERROR = 'ERROR',
}

export class SocketService {
  private socket: Socket | null = null;
  private uri: string = '';

  public setUri(uri: string): void {
    this.uri = uri;
  }

  public connect(): void {
    if(!this.uri) return;
    // const url = new URL('https://example.com/path?name=JohnDoe&age=30');
    const url = new URL(this.uri);
    const link = this.uri.replace(url.search, '');
    console.log('link', link);
    this.socket = io(this.uri);
    return;
    console.log('this.socket', this.socket);
    console.info(`Connecting to ${this.uri}`);

    this.on('message', (data) => {
      alert(JSON.stringify(data, null, 4));
    });

    this.on('connect', () => {
      console.info('Connected to server');
    });

    this.on('disconnect', () => {
      console.info('Disconnected from server');
    });
  }

  public emit(event: string, data: object): void {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket not connected');
    }
  }

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