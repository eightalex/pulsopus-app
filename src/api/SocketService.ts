import { io, Socket } from "socket.io-client";
import { EUserSocketEvent } from './services';

export type ESocketEvent = string | EUserSocketEvent;

export class SocketService {
  private socket: Socket | null = null;
  private uri: string = '';

  public setUri(uri: string): void {
    this.uri = uri;
  }

  public async connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      if(!this.uri) {
        reject('No connection uri');
        return;
      }

      const url = new URL(this.uri);
      const link = this.uri.replace(url.search, '');
      const params = new URLSearchParams(url.search);

      const query: Record<string, string> = {};
      for (const [key, value] of params.entries()) {
        query[key] = value;
      }

      const connection = io(link, {
        query,
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000,
        timeout: 20000,
      });

      console.info(`Connecting to ${link}`);

      connection.on('connect_error', (error) => {
        console.error('Socket connection error', error);
        reject(error);
      });

      connection.on('error', (error) => {
        console.error('Socket error:', error);
        reject(error);
      });

      connection.on('connect', () => {
        console.info(`Socket connected to server. Connection ID: ${connection.id}`);
        this.socket = connection;
        resolve(connection);
      });

      connection.on('disconnect', () => {
        console.info('Disconnected from server');
      });

      connection.on("ping", () => {
        console.info('Socket connection "Ping"');
      });

      connection.on("reconnect", () => {
        console.info('Socket reconnect');
      });

      connection.on("reconnect_error", (error) => {
        console.error('Socket reconnect error', error);
      });

    });
  }

  public emit<Date extends object>(event: ESocketEvent, data: Date): void {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket not connected');
    }
  }

  public on<Message extends object>(event: ESocketEvent, callback: (data: Message) => void): void {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    this.socket.on(event, callback);
  }

  public disconnect(): void {
    if(!this.connected) return;
    this.socket?.disconnect();
    console.info('Socket disconnected');
  }

  public destroy() {
    // return;
    this.disconnect();
    this.socket = null;
  }

  public get connected(): boolean {
    return Boolean(this.socket?.connected);
  }
}

export default SocketService;