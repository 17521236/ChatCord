import { Injectable } from '@angular/core';
import { MessageType } from 'src/app/components/message-notification/MessageType.enum';

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService {

  msg = '';
  isShow = false;
  messageType: MessageType;
  countDown: any;
  timeout=3000;

  constructor() { }

  setInfo(...args: [message: string, timeout?: number]): void {
    if (this.countDown) {
      clearTimeout(this.countDown);
    }
    this.msg = args[0];
    this.isShow = true;
    this.countDown = setTimeout(() => this.hide(),args[1]?args[1]:this.timeout);
  }

  success(...args:[message: string,timeout?:number]): void {
    this.messageType = MessageType.success;
    this.setInfo(args[0],args[1]?args[1]:this.timeout);
  }

  danger(...args:[message: string,timeout?:number]): void {
    this.messageType = MessageType.danger;
    this.setInfo(args[0],args[1]?args[1]:this.timeout);
  }

  info(...args:[message: string,timeout?:number]): void {
    this.messageType = MessageType.info;
    this.setInfo(args[0],args[1]?args[1]:this.timeout);
  }

  hide(): void {
    this.isShow = false;
    clearTimeout(this.countDown);
  }
}
