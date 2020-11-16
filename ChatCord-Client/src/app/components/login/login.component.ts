import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { NoWhitespaceValidator } from 'src/app/validators/no-white-space.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private socketIoService: SocketIoService, private fb: FormBuilder, private router: Router) {

    this.formGroup = fb.group({
      'username': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32), NoWhitespaceValidator()]],
      'room': ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.socketIoService.listenEvent('server-response-login').subscribe(console.log);
  }

  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.socketIoService.sendData('client-login', this.formGroup.value);
      this.router.navigate(['/home']);
    }
  }

}
