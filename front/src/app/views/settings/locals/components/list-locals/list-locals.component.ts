import { Component, Input, OnInit } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalMModel } from 'src/app/shared/interfaces/localm';

@Component({
  selector: 'app-list-locals',
  templateUrl: './list-locals.component.html',
  styleUrls: ['./list-locals.component.scss']
})
export class ListLocalsComponent implements OnInit {

  @Input() localsList:LocalMModel[];
  @Input() orderColumn:any;
  @Input() displayData:any;
  @Input() loading:boolean;
  @Input() hasAdminModule:boolean;

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
  ) 
  {}

  ngOnInit(): void { }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {

    this._crudSvc.deleteRequest(`/settings/stores/destroy/${id}`)
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