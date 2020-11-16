import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMessageFromServer, IRoomInfo } from 'src/app/models/message.model';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../login/login.component.css']
})

export class HomeComponent implements OnInit {

  formMsg: FormGroup;
  allMsg: IMessageFromServer[] = [];
  room: IRoomInfo = { room: '', users: [] };

  constructor(private socketIoServer: SocketIoService, private fb: FormBuilder, private router: Router) {
    this.formMsg = this.fb.group({
      message: ''
    });
  }

  ngOnInit(): void {
    this.listenMessageFromServer();
    this.listenAnotherPeopleJoin();
  }

  listenAnotherPeopleJoin(): void {
    this.socketIoServer.listenEvent('server-response-login').subscribe((res: IRoomInfo) => {
      this.room = res;
      console.log('users: ',res);
    });
  }

  listenMessageFromServer(): void {
    this.socketIoServer.listenEvent('server-response-send-message').subscribe((res: IMessageFromServer) => {
      this.allMsg.push(res);
      // reset input filed
      setTimeout(() => this.scrollDown(), 30);
      this.formMsg.controls.message.reset();
    });
  }

  sendMessage($event): void {
    const myMsg = this.formMsg.controls.message.value;
    if (!myMsg || myMsg === '' || $event.keyCode !== 13) {
      return;
    }

    // send to server
    this.socketIoServer.sendData('client-send-message', myMsg);
  }

  scrollDown(): void {
    const element = document.querySelector('.messages');
    element.scrollTop = element.scrollHeight;
  }
}

