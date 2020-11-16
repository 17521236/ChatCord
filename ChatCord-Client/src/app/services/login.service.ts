import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {

  }

  sendMessage(msg: string) {
    //this.socket.emit("message", msg);
  }



}
