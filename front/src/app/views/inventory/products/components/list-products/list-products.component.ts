import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductsDetailService } from '../../../../accounting/sales/services/products-detail.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  @Input() productsList:ProductModel[]; 
  @Input() orderColumn:any;
  @Input() loading:boolean; 
  @Input() isModal:boolean; 
   
  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
    private _productDetailSvC:ProductsDetailService,
  ) { }

  ngOnInit(): void {}

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {

    this._crudSvc.deleteRequest(`/products/destroy/${id}`)
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

  beforeAdd(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }


  confirmAdd(id:number): void {
    this._crudSvc.getRequest(`/products/consultAvailability/${id}`)
    .subscribe((res:any) => {
      const { success, data } = res; 
      if(success){
        this._productDetailSvC.setListProduct$(data);
        this.nzMessageService.success('Producto agregado correctamente');
      }
    })
  }


}
