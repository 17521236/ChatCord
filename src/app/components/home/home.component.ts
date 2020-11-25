import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
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

  formMsg: FormGroup;
  allMsg: IMessageFromServer[] = [];
  room: IRoomInfo = { room: '', users: [] };
  isShowRoomInfo=false;
  @ViewChild('inputMsg') inputMsg:ElementRef;


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
    this.listenLogout();
    this.listenMessageFromServer();
    this.listenAnotherPeopleJoin();
  }

  listenLogout(){
    // use when user disconnect but not logout
    this.socketIoService.listenEvent('server-response-user-logout').subscribe(res=> this.logout())
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
      if(res.isMine){
        this.formMsg.controls.message.reset();
      }
    });
  }

  // action in component
  sendMessage(): void {
    const myMsg = this.formMsg.controls.message.value;
    if (!myMsg || myMsg === '') {
      return;
    }
    // send to server
    this.socketIoService.sendData('client-send-message', myMsg);
    this.inputMsg.nativeElement.focus();
  }

  scrollDown(): void {
    const element = document.querySelector('.messages');
    element.scrollTop = element.scrollHeight;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  showRoomInfo():void{
    this.isShowRoomInfo=true;
  }
  hideRoomInfo():void{
    this.isShowRoomInfo=false;
  }

}

