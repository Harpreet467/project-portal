import { Injectable } from '@angular/core';
import {LoginModel} from './login.model';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'

})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: LoginModel) {
    return this.http.post(AppConfig.AUTH_API, login).pipe(shareReplay());
  }

  getAccountDetails() {
    return this.http.get(AppConfig.ACCOUNT_DETAILS_API);
  }

}
