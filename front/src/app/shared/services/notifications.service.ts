import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  
  constructor(private notification: NzNotificationService) {}

  public blank(title:string, message:string, position: NzNotificationPlacement): void {
    this.notification.blank( title, message, { nzPlacement: position } );
  }

  public success(title:string, message:string, position: NzNotificationPlacement): void {
    this.notification.success( title, message, { nzPlacement: position } );
  }

  public create(title:string, message:string, position: NzNotificationPlacement): void {
    this.notification.error( title, message, { nzPlacement: position } );
  }

  public warning(title:string, message:string, position: NzNotificationPlacement): void {
    this.notification.warning( title, message, { nzPlacement: position } );
  }

  public info(title:string, message:string, position: NzNotificationPlacement): void {
    this.notification.info( title, message, { nzPlacement: position } );
  }

  
}
