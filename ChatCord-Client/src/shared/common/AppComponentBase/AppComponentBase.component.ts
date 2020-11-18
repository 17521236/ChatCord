import { Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageNotificationService } from 'src/app/services/common/message-notification.service';
import { SocketIoService } from 'src/app/services/socket-io.service';

export abstract class AppComponentBase {

  message: MessageNotificationService;
  router: Router;
  socketIoService: SocketIoService;
  fb: FormBuilder;

  constructor(injector: Injector) {
    this.message = injector.get(MessageNotificationService);
    this.router = injector.get(Router);
    this.socketIoService = injector.get(SocketIoService);
    this.fb = injector.get(FormBuilder);
  }

}
