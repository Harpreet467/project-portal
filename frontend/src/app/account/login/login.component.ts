import { Component, OnInit } from '@angular/core';
import {LoginModel} from './login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginParam: LoginModel = new LoginModel();

  constructor(
  ) { }

  ngOnInit() {
  }

  login() {
  }
}
