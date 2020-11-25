import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket: any;
  SERVER_URL=environment.SOCKET_ENDPOINT;
  constructor() { }

  createConnect(): void {
    this.socket = io(this.SERVER_URL, { transports: ['websocket'] });
  }

  testConnect(): boolean {
    return this.socket ? true : false;
  }

  sendData(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  listenEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, data => {
        observer.next(data);
      });
      return () => {
        observer.complete();
      };
    });
  }
}
