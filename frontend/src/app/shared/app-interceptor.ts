import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {ProgressBarService} from './service/progress-bar.service';
import {catchError, tap} from 'rxjs/operators';
import {ErrorHandleService} from './service/error-handle.service';
import {AuthService} from './service/auth.service';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private progressBarService: ProgressBarService,
    private errorHandleService: ErrorHandleService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.show();

    request = request.clone({
      url: environment.HOST + request.url,
      setHeaders: {
        'Content-type': 'application/json'
      }
    });
    request = this.authService.addAuthenticationToken(request);

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.progressBarService.hide();
            return event;
          }
        }, (error) => {
          return throwError(error);
        }),
        catchError((error) => {
          this.progressBarService.hide();
          return this.errorHandleService.errorAction(error, request, next);
        })
      );
  }

}
