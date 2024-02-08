import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((response: HttpResponse<any>) => {

        const { body } = response;

        if(body?.message){
          if (body?.success) return this.notification.success( 'Operacion Exitosa!', body?.message, 'top');
          return this.notification.warning('Opss...', body?.message, 'bottomRight');
        }

      })
    )


  }
  constructor(private notification: NotificationsService) { }
}
