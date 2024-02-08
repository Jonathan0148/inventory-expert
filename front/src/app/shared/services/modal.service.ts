import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modal: NzModalService) {}

  public confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.modal.confirm({
        nzTitle: title,
        nzContent: message,
        nzOnOk: () => resolve(true),
        nzOnCancel: () => reject(false),
      });
    });
  }
}
