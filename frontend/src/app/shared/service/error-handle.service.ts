import { Injectable } from '@angular/core';
import {SharedService} from './shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {HttpErrorResponse, HttpHandler, HttpRequest} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {StorageService} from './storage.service';
import {AuthService} from './auth.service';
import {TokenModel} from '../../account/login/login.model';
import {switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  constructor(
    private sharedService: SharedService,
    private storageService: StorageService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  errorAction(error, request: HttpRequest<any>, next: HttpHandler) {
    this.snackBar.open(error.statusText);

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 403:
          this.handle403Error();
          break;

        case 401:
          return this.handle401Error(request, next, error);
      }
    }
    return throwError(error);
  }

  handle403Error() {
    this.location.back();
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    if (request.url.includes(AppConfig.AUTH_API)) {
      return throwError(error);
    } else if (request.url.includes(AppConfig.REFRESH_TOKEN_API) || !this.storageService.getUserToken()) {
      this.sharedService.logout();
    } else {
      this.snackBar.dismiss();
      return this.authService
        .refreshAccessToken()
        .pipe(
          switchMap((token: TokenModel) => {
            this.storageService.setUserToken(token.access_token);
            return next.handle(this.authService.addAuthenticationToken(request));
          })
        );
    }
  }

}
