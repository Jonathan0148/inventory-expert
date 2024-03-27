import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProductModel } from 'src/app/shared/interfaces/product';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-form-losse',
  templateUrl: './form-losse.component.html',
  styleUrls: ['./form-losse.component.scss']
})
export class FormLosseComponent implements OnInit {
  id: number;
  form: FormGroup;
  loading:boolean;
  storesList: StoreModel[] = [];
  pageStore: number = 1;
  termStore: string = '';
  lastPageStore: number;
  productsList: ProductModel[] = [];
  pageProduct: number = 1;
  termProduct: string = '';
  lastPageProduct: number;
  isDetail: boolean = false;
  basicLicense: boolean = false;
  stock: number = 0;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private _notificationSvC:NotificationsService,   
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.getLosse();
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        store_id: [ 1, [ Validators.required ] ],
        product_id: [ null, [ Validators.required ] ],
        amount: [ null, [ Validators.required ] ],
        description: [ null, [ ] ]
    });

    if(this.id) this.getLosse()
    this.getStores();
    this.getProducts();
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/inventory/losses/edit/${this.id}` : `/inventory/losses/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'inventario','bajas']);
      }
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getLosse(){
    this._crudSvc.getRequest(`/inventory/losses/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }

  public getStores():void {
    const query = [
      `?page=${this.pageStore}`,
      `&term=${this.termStore}`
    ].join('');
    
    if( this.lastPageStore && ((this.lastPageStore < this.pageStore) && !this.termStore) ) return
    
    this._crudSvc.getRequest(`/settings/stores/availableLocals${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termStore) ? this.storesList = [...this.storesList,  ...data.data] : this.storesList = data.data;
        this.lastPageStore = data.last_page;
        this.pageStore++;
    })
  }

  public getProducts():void {
    const query = [
      `?page=${this.pageProduct}`,
      `&term=${this.termProduct}`
    ].join('');
    
    if( this.lastPageProduct && ((this.lastPageProduct < this.pageProduct) && !this.termProduct) ) return
    
    this._crudSvc.getRequest(`/inventory/products/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termProduct) ? this.productsList = [...this.productsList,  ...data.data] : this.productsList = data.data;
        this.lastPageProduct = data.last_page;
        this.pageProduct++;
    })
  }

  private validateLocal(){
    this._crudSvc.getRequest(`/settings/stores/validateLocal`).subscribe((res: any) => {
      const { data } = res;
      if (data == 1) this.basicLicense = true; 
    })
  }
  
  public onChangeProduct(){
    const id = this.form.value.product_id;

    this._crudSvc.getRequest(`/inventory/products/show/${id}`).subscribe((res: any) => {
      const { data } = res;
      this.stock = data?.stock;
    })
  }

  public onChangeAmount(){
    if (this.form.value.product_id) {
      if(this.form.value.amount > this.stock) {
        this._notificationSvC.info('Atención','La cantidad ingresada supera el stock disponible del producto','top');
        this.form.patchValue({amount: null});
      };
    }else{
      this._notificationSvC.info('Atención','Seleccione un producto','top');
      this.form.patchValue({amount: null});
    }
  }
}