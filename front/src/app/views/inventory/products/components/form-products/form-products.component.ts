import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { StatusService } from '../../services/status.service';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { MeasurementUnitService } from 'src/app/views/settings/users/services/measurement-unit.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProductsComponent implements OnInit {
  @Input() id:number;
  @Input() isDetailForm:boolean;
  @Input() product:ProductModel;
  @Output() isEditEmit = new EventEmitter<boolean>();

  isEdit: boolean = false;

  form: FormGroup;
  statusList:StatusModel[] = this._statusSvc.get();

  loading: boolean;
  storesList: StoreModel[] = [];
  pageStore: number = 1;
  termStore: string = '';
  lastPageStore: number;
  isDetail: boolean = false;
  measurementUnitList = this._measurementUnitSvC.get();
  avatarUrl: string = "";
  setImagesUrl: any;
  basicLicense: boolean = false;

  constructor(
    private modalService: NzModalService, 
    private fb: FormBuilder, 
    private _statusSvc: StatusService,
    private _crudSvc: CrudServices,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _measurementUnitSvC: MeasurementUnitService,
    ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });
  }

  ngOnInit(): void {
    this.getStores();
    this.form = this.fb.group({
        store_id: [ 1, [ Validators.required ] ],
        brand_id: [ null, [ ] ],
        shelf_id: [ null, [ ] ],
        row_id: [ null, [ ] ],
        column_id: [ null, [ ] ],
        reference: [ null, [ Validators.required, Validators.maxLength(25) ] ],
        name: [ null, [ Validators.required, Validators.maxLength(50) ] ],
        description: [ null, [ ] ],
        applications: [ null , [ ] ],
        measurement_unit: [ null, [ Validators.required ] ],
        stock: [ null, [ Validators.required ] ],
        stock_min: [ null, [ Validators.required ] ],
        cost: [ null, [ Validators.required ] ],
        price: [ null, [ Validators.required ] ],
        is_original: [ null , [ ] ],
        tax: [ 0, [  ] ],
        discount: [ 0, [  ] ],
        images: [ {} , [ ] ],
        barcode: [ null , [ ] ],
        category: [ null , [ ] ],
        categories: [ null , [ ] ],
        status: [ 'in-stock' , [ Validators.required ] ],
    });

    if(this.id) this.setProductForm()
    this.validateLocal();
  }

  submitForm(): void {
    this.loading = true;
    let path = this.id ? `/inventory/products/edit/${this.id}` : `/inventory/products/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/','inventario', 'productos']);
      }
    })
  }

  edit() {
      this.isEdit = true;
  }

  editClose() {
    this.isEditEmit.emit(true)
  }

  save() {
      this.modalService.confirm({
          nzTitle  : '<i>Esta seguro de realizar estos cambios?</i>',
          nzOnOk   : () => this.submitForm()
      });
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getReference():void {
    this._crudSvc.getRequest(`/inventory/products/getReference`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue({ reference: data })
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

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  
  private setProductForm = (): void => {
    this.form.patchValue(this.product);
    this.avatarUrl = this.product?.images[0]?.response?.url;
    this.setImagesUrl = this.product?.images;
  };  
  
  receiveImages(images: any) {
    this.avatarUrl = images[0]?.response?.url;
    this.form.patchValue({images: images});
  }

  private validateLocal(){
    this._crudSvc.getRequest(`/settings/stores/validateLocal`).subscribe((res: any) => {
      const { data } = res;
      if (data == 1) this.basicLicense = true; 
    })
  }
}