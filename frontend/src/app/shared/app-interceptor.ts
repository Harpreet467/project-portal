import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {ProgressBarService} from './service/progress-bar.service';
import {tap} from 'rxjs/operators';
import {StorageService} from './service/storage.service';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private progressBarService: ProgressBarService,
    private location: Location
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.show();

    request = request.clone({
      url: environment.HOST + request.url,
      setHeaders: {
        Authorization: `Bearer ${this.storageService.getUserToken()}`,
        'Content-type': 'application/json'
      }
    });
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
                this.progressBarService.hide();
                return event;
          }
        }, (error) => {
            this.progressBarService.hide();

            if (error instanceof HttpErrorResponse) {
              this.snackBar.open(error.message);

              if (error.status === 401) {
                this.location.back();
              }
            }
        })
      );
  }

}
