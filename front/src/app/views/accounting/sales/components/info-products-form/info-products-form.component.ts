import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { finalize, filter } from 'rxjs/operators';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ProductsDetailService } from '../../services/products-detail.service';
import { ValidationsForm } from '../../validations/validations-form';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalSearchProductsComponent } from '../modal-search-products/modal-search-products.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-products-form',
  templateUrl: './info-products-form.component.html',
  styleUrls: ['./info-products-form.component.scss']
})
export class InfoProductsFormComponent implements OnInit, OnDestroy {
  @Input() form:UntypedFormGroup;
  @Input() products:UntypedFormArray;
  
  listSubscribers: Subscription[] = [];
  formProduct:UntypedFormGroup;
  loading:boolean; 
  
  constructor(
    private fb: UntypedFormBuilder,
    private _crudSvc:CrudServices,
    private _notificationSvC:NotificationsService,
    private _productDetailSvC:ProductsDetailService,
    private _modalSvC: NzModalService,

  ) { }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
        id: [ null, [ ] ],
        reference: [ null, [ Validators.required ] ],
        name:[null, [  ]],
        stock:[null, [  ]],
        amount:[null, [ Validators.required ]],
        price:[null, [ Validators.required ]],
    },
    {
      validator: ValidationsForm.match('stock', 'amount', 'no-same')
    });    
    
    this.listenObserver();
  }

  public submit(): void {

    if(!this.validateExists() && !this.validateExistsForMultiple(this.formProduct.get('id').value)) {
      this.addProductsForm(this.formProduct.value)
      this._productDetailSvC.setChangePrice$(true)
      this.formProduct.reset()
      return
    }

    this.showNotificationExists();
    
  }

  private addProductsForm(product: ProductModel):void {          
      const lessonForm = this.fb.group({
        product_id: [product?.id],
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

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onChangeReference(event){
    this.resetFields()
    if(!event) return

    let reference = this.formProduct.get('reference').value;

     this._crudSvc.getRequest(`/products/getForReference/${reference}`).subscribe((res: any) => {
      const { success,data } = res;
      if(success){ 
        this.formProduct.patchValue(data)       
      } 
    })
  }

  public onChangeAmount(amount:number){
    let stock = this.formProduct.get('stock').value;
    if(amount > stock) this._notificationSvC.info('Atención','No hay suficientes unidades disponibles','top');
  }

  public onClikOpenModal():void {
    this._modalSvC.create({
      nzTitle: 'Buscar Productos',
      nzContent: ModalSearchProductsComponent,
      nzClosable: true,
      nzWidth: '85%'
    });
    
  }

  public ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
 
  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private listenObserver = () => {
    const observer1$ = this._productDetailSvC.productLists$.subscribe((res) => {
      if(!this.validateExistsForMultiple(res.id)){
        this.addProductsForm(res);
        this._productDetailSvC.setChangePrice$(true);
        return 
      }
      this.showNotificationExists();
    });

    this.listSubscribers = [observer1$];
  }
  
  

  private resetFields() {
    this.formProduct.patchValue({ name:null,stock:null,amount:null, price:null })
  }
  

  private validateExists = () => (this.products.value.filter(e => e.id == this.formProduct.get('id').value)).length;
  private validateExistsForMultiple = (id:number) => (this.products.value.filter(e => e.product_id == id)).length;
  private showNotificationExists = () => this._notificationSvC.info('Atención','Ya se ha agregado ese producto a la venta','top');
  
  

  
}

