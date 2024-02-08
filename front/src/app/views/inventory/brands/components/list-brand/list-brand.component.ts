import { Component, Input, OnInit } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.scss']
})
export class ListBrandComponent implements OnInit {

  @Input() brandsList:BrandModel[];
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

    this._crudSvc.deleteRequest(`/brands/destroy/${id}`)
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
