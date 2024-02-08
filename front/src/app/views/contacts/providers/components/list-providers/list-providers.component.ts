import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProviderModel } from 'src/app/shared/interfaces/provider';
import { CrudServices } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.scss']
})
export class ListProvidersComponent implements OnInit {
  @Input() providersList:ProviderModel[]; 
  @Input() orderColumn:any;
  @Input() loading:boolean;  

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
  ) 
  { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {
    this._crudSvc.deleteRequest(`/providers/destroy/${id}`)
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
