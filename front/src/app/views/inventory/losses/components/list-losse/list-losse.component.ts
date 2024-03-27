import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LosseModel } from 'src/app/shared/interfaces/losse';
import { CrudServices } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-list-losse',
  templateUrl: './list-losse.component.html',
  styleUrls: ['./list-losse.component.scss']
})
export class ListLosseComponent implements OnInit {
  @Input() lossesList:LosseModel[];
  @Input() orderColumn:any;
  @Input() displayData:any;
  @Input() loading:boolean; 
  @Input() hasAdminModule:boolean;

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
  ) 
  {}

  ngOnInit(): void {
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {

    this._crudSvc.deleteRequest(`/inventory/losses/destroy/${id}`)
    .subscribe(res => {
      this._crudSvc.requestEvent.emit('deleted')
    })
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}