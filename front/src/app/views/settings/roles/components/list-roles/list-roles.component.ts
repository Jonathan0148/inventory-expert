import { Component, Input, OnInit } from '@angular/core';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CrudServices } from '../../../../../shared/services/crud.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent implements OnInit {

  @Input() rolesList:RoleModel[];
  @Input() orderColumn:any;
  @Input() displayData:any;
  @Input() loading:boolean; 

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

    this._crudSvc.deleteRequest(`/roles/destroy/${id}`)
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
