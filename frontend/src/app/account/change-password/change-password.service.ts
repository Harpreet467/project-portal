import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangePasswordModel} from "./change-password.model";
import {AppConfig} from "../../app.config";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  changePassword(changePasswordModel: ChangePasswordModel) {
    return this.http.patch(AppConfig.CHANGE_PASSWORD_API, changePasswordModel);
  }

}
