import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationsService } from '../../../../../shared/services/notifications.service';
import { ProductsDetailService } from '../../services/products-detail.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalSearchProductsComponent } from '../modal-search-products/modal-search-products.component';
import { Subscription } from 'rxjs';
import { ValidationsForm } from '../../validations/validations-form';

@Component({
  selector: 'app-list-products-form',
  templateUrl: './list-products-form.component.html',
  styleUrls: ['./list-products-form.component.scss']
})
export class ListProductsFormComponent implements OnInit {
  @Input() form:UntypedFormGroup;
  @Input() products:UntypedFormArray;
  productList:ProductModel[] = [];
  subscription: Subscription;
  @Input() hasAdminModule:boolean;

  constructor(
    private _notificationSvC:NotificationsService,    
    private nzMessageService: NzMessageService,
    private _productDetailSvC:ProductsDetailService,
    private _crudSvc:CrudServices,
    private _modalSvC: NzModalService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.listenObserver();
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

  private addProductsForm(product: ProductModel):void {
    const lessonForm = this.fb.group({
      product_id: [product?.id],
      image: [product?.images[0]?.response?.url],
      reference: [product?.reference],
      name: [product.name],
      amount: [product?.amount ?? 1],
      stock: [product?.stock],
      price:[product?.price],
      subtotal:[(product?.amount ?? 1) * product?.price],
    },   
    {
      validator: ValidationsForm.match('stock', 'amount', 'no-same')
    });      
    this.products.push(lessonForm);  
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

  public searchProduct(event: any){
    const body = {
      reference: event
    }
    this._crudSvc.postRequest(`/inventory/products/searchProduct`, body).subscribe((res: any) => {
      const { data } = res;
      if(!this.validateExistsForMultiple(data.id)){
        this.addProductsForm(data);
        this._productDetailSvC.setChangePrice$(true);
        this.form.patchValue({referenceSearch: null});
        return 
      }
      this.showNotificationExists();
      this.form.patchValue({referenceSearch: null});
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  private listenObserver = () => {
    this.subscription = this._productDetailSvC.productLists$.subscribe((res) => {
      if(!this.validateExistsForMultiple(res.id)){
        this.addProductsForm(res);
        this._productDetailSvC.setChangePrice$(true);
        return 
      }
      this.showNotificationExists();
    });
  }

  private validateExistsForMultiple = (id:number) => (this.products.value.filter(e => e.product_id == id)).length;
  private showNotificationExists = () => this._notificationSvC.info('Atención','Ya se ha agregado ese producto a la venta','top');
}