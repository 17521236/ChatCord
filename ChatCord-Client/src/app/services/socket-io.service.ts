import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket: any;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT, { transports: ['websocket'] });
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
