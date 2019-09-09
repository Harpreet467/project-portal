import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterModel} from './register.model';
import {RegisterService} from './register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerParams: RegisterModel = new RegisterModel();

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  register() {
    this.registerParams.role = 'ROLE_DEVICE_ADMIN';
    this.registerService.register(this.registerParams).subscribe((res: any) => {
      this.router.navigate(['home/login']);
    }, (err) => {
      this.router.navigate(['home/register']);
    });
  }

}
