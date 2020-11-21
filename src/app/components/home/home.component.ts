import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMessageFromServer, IRoomInfo, IUser } from 'src/app/models/message.model';
import { environment } from 'src/environments/environment';
import { AppComponentBase } from 'src/shared/common/AppComponentBase/AppComponentBase.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent extends AppComponentBase implements OnInit {

  // SERVER_URL = environment.SOCKET_ENDPOINT;
  SERVER_URL='https://chatcord-api.herokuapp.com';
  formMsg: FormGroup;
  allMsg: IMessageFromServer[] = [];
  room: IRoomInfo = { room: '', users: [] };


  constructor(private injector: Injector) {
    super(injector);

    if (!this.socketIoService.testConnect()) {
      this.logout();
    }
    this.formMsg = this.fb.group({
      message: ''
    });
  }

  ngOnInit(): void {
    this.listenUserLogout()
    this.listenMessageFromServer();
    this.listenAnotherPeopleJoin();
  }

  listenAnotherPeopleJoin(): void {
    this.socketIoService.listenEvent('server-response-login').subscribe((res: IRoomInfo) => {
      this.room = res;
    });
  }

  listenMessageFromServer(): void {
    this.socketIoService.listenEvent('server-response-send-message').subscribe((res: IMessageFromServer) => {
      this.allMsg.push(res);
      // reset input filed
      setTimeout(() => this.scrollDown(), 30);
      this.formMsg.controls.message.reset();
    });
  }

  listenUserLogout(): void {
    this.socketIoService.listenEvent('server-response-user-logout').subscribe(() => this.logout());
  }


  // action in component
  sendMessage(): void {
    const myMsg = this.formMsg.controls.message.value;
    if (!myMsg || myMsg === '') {
      return;
    }

    // send to server
    this.socketIoService.sendData('client-send-message', myMsg);
  }

  scrollDown(): void {
    const element = document.querySelector('.messages');
    element.scrollTop = element.scrollHeight;
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.socketIoService.sendData('client-user-logout', '');
  }

}

