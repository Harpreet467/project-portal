import { Injectable } from '@angular/core';
import {RegisterModel} from './register.model';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(register: RegisterModel) {
    return this.http.post(AppConfig.signUpModule, register);
  }

}
