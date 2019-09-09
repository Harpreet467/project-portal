import { Injectable } from '@angular/core';
import {LoginModel} from './login.model';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';

@Injectable({
  providedIn: 'root'

})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: LoginModel) {
    return this.http.post(AppConfig.loginModule, login);
  }

}
