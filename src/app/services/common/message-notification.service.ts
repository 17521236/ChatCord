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

  constructor() { }

  setInfo(message: string): void {
    if (this.countDown) {
      clearTimeout(this.countDown);
    }
    this.msg = message;
    this.isShow = true;
    this.countDown = setTimeout(() => this.hide(), 3000);
  }

  success(message: string): void {
    this.messageType = MessageType.success;
    this.setInfo(message);
  }

  danger(message: string): void {
    this.messageType = MessageType.danger;
    this.setInfo(message);
  }

  info(message: string): void {
    this.messageType = MessageType.info;
    this.setInfo(message);
  }

  hide(): void {
    this.isShow = false;
    clearTimeout(this.countDown);
  }
}
