import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { UserModel } from '../../../../../shared/interfaces/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @Input() usersList:UserModel[]; 
  @Input() orderColumn:any;
  @Input() loading:boolean;
  @Input() hasAdminModule:boolean;
  isSuperAdmin: boolean = false;

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
    ) 
    {}

  ngOnInit(): void {
    this.validateIsSuperAdmin();
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {
    this._crudSvc.deleteRequest(`/settings/users/destroy/${id}`)
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

  validateIsSuperAdmin(){
    this._crudSvc.getRequest(`/settings/users/getUser`)
    .subscribe((res: any) => {
      const { success, data } = res;
      if (success) {
        if(data.is_super == 1) this.isSuperAdmin = true;
      }
    })
  }
}