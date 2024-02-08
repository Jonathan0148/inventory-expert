import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        let errorMessage = error?.message;
      
        if(error?.error?.message){
          this.notification.warning('Opss...', error?.error?.message, 'bottomRight');
          return throwError(errorMessage);
        }
        return next.handle(request);
      })
      )
  }

  constructor(private notification: NotificationsService) { }

}
