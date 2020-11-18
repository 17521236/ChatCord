import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IIcon } from 'src/app/models/message.model';
import { NoWhitespaceValidator } from 'src/app/validators/no-white-space.validator';
import { environment } from 'src/environments/environment';
import { AppComponentBase } from 'src/shared/common/AppComponentBase/AppComponentBase.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppComponentBase implements OnInit {

  @ViewChild('modal') modal: ElementRef;
  // SERVER_URL = environment.SOCKET_ENDPOINT;
  SERVER_URL = 'https://chatcord-api.herokuapp.com';
  formGroup: FormGroup;
  icons: IIcon[] = [];
  isExist = false;

  constructor(private injector: Injector, private http: HttpClient) {
    super(injector);

    this.formGroup = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), NoWhitespaceValidator()]],
      'room': ['', Validators.required],
      'avatarUrl': ['', Validators.required]
    });
    this.socketIoService.createConnect();
  }

  ngOnInit(): void {
    this.getIcons();
    this.listenResponseLogin();
  }
  // listen
  getIcons(): void {
    this.socketIoService.listenEvent('server-response-icons').subscribe(res => {
      this.icons = res;
      this.formGroup.controls['avatarUrl'].setValue(this.icons[0]?.url);
    });
  }

  listenResponseLogin(): void {
    this.socketIoService.listenEvent('server-response-login-fail').subscribe((res) => {
      this.message.danger('User name is existed !!!');
    });
    this.socketIoService.listenEvent('server-response-login-success').subscribe((res) => {
      this.router.navigate(['/home']);
    });
  }

  onSubmit(): void {
    if (this.formGroup.controls['username'].value === '* Bot *'){
this.message.danger('User name can\'t is "* Bot *"');
return;
    }
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.socketIoService.sendData('client-login', this.formGroup.value);
    }
  }

  showModalAvatar(): void {
    this.modal.nativeElement.classList.add('modal--show');
  }

  hideModalAvatar(): void {
    this.modal.nativeElement.classList.remove('modal--show');
  }

  chooseAvatar(url: string): void {
    this.formGroup.controls['avatarUrl'].setValue(url);
    this.modal.nativeElement.classList.remove('modal--show');
  }

}
