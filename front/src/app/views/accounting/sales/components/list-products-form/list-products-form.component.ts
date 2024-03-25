import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationsService } from '../../../../../shared/services/notifications.service';
import { ProductsDetailService } from '../../services/products-detail.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalSearchProductsComponent } from '../modal-search-products/modal-search-products.component';

@Component({
  selector: 'app-list-products-form',
  templateUrl: './list-products-form.component.html',
  styleUrls: ['./list-products-form.component.scss']
})
export class ListProductsFormComponent implements OnInit {
  @Input() form:UntypedFormGroup;
  @Input() products:UntypedFormArray;
  productList:ProductModel[] = [];

  constructor(
    private _notificationSvC:NotificationsService,    
    private nzMessageService: NzMessageService,
    private _productDetailSvC:ProductsDetailService,
    private _crudSvc:CrudServices,
    private _modalSvC: NzModalService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
  }

  public onChangeAmount(indexProduct:number){
    this._productDetailSvC.setChangePrice$(true)
    let { stock, amount } = this.products.at(indexProduct).value;
    if(amount > stock) this._notificationSvC.info('Atención','No hay suficientes unidades disponibles','top');
  }

  public onChangePrice(){
    this._productDetailSvC.setChangePrice$(true)
  }
  
  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(indexProduct:number,sale_id:number): void {
    if(sale_id){
      this._crudSvc.deleteRequest(`/sales/destroyDetail/${sale_id}`)
      .subscribe(res => {})
    }
   this.products.removeAt(indexProduct);
   this._productDetailSvC.setChangePrice$(true)
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  public onClikOpenModal(tplFooter: TemplateRef<{}>):void {
    this._modalSvC.create({
      nzTitle: 'Buscar Productos',
      nzContent: ModalSearchProductsComponent,
      nzClosable: true,
      nzWidth: '85%',
      nzFooter: tplFooter
    });
  }
}