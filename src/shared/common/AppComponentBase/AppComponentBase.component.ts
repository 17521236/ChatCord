import { Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageNotificationService } from 'src/app/services/common/message-notification.service';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { environment } from 'src/environments/environment';

export abstract class AppComponentBase {

  message: MessageNotificationService;
  router: Router;
  socketIoService: SocketIoService;
  fb: FormBuilder;
  SERVER_URL:string;

  constructor(injector: Injector) {
    this.message = injector.get(MessageNotificationService);
    this.router = injector.get(Router);
    this.socketIoService = injector.get(SocketIoService);
    this.fb = injector.get(FormBuilder);
    this.SERVER_URL=environment.SOCKET_ENDPOINT;
  }

}
