import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {StorageService} from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  refreshAccessToken() {
    return this.http.get(AppConfig.REFRESH_TOKEN_API);
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    const accessToken = this.storageService.getUserToken();
    if (!accessToken) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

}
