import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CategoryModel } from 'src/app/shared/interfaces/category';
import { BasicSelect } from '../../../../../shared/interfaces/basic-select';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { StatusService } from '../../services/status.service';
import { SubcategoryModel } from '../../../../../shared/interfaces/subcategory';

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
  brandsList:BrandModel[] = [];
  statusList:StatusModel[] = this._statusSvc.get();
  originalList:BasicSelect[] = [
    { label: 'Si', value: 1 },
    { label: 'No', value: 0 }
  ];

  loading: boolean;
  pageBrand:number = 1;
  termBrand:string = '';
  lastPageBrand:number;

  constructor(
    private modalService: NzModalService, 
    private fb: FormBuilder, 
    private _statusSvc: StatusService,
    private _crudSvc: CrudServices,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });
  }

  ngOnInit(): void {
      this.form = this.fb.group({
          name: [ null , [ Validators.required ] ],
          code: [ null , [ ] ],
          reference: [ null , [ Validators.required ] ],
          stock: [ 0 , [ Validators.required ] ],
          original: [ null , [ ] ],
          tax: [ 0 , [ Validators.max(100), Validators.min(0) ] ],
          price: [ 0 , [ Validators.required ] ],
          category: [ null , [ ] ],
          subcategory: [ null , [ ] ],
          id_brand: [ null , [ ] ],
          status: [ null , [ Validators.required ] ],
          applications: [ null , [ ] ],
          categories: [ null , [ ] ],
          id_column: [ null , [ ] ],
          id_row: [ null , [  ] ],
          id_section: [ null , [  ] ],
          stockMin: [ 0 , [ Validators.required ] ],
          cost: [ 0 , [ Validators.required ] ],
          discount: [ 0, [ Validators.max(100), Validators.min(0) ] ],
          description: [ null , [ Validators.required ] ],
      });

      if(!this.isDetailForm) this.getCount();
      if(this.id) this.setProductForm()
      this.getBrands()
  }

  submitForm(): void {
    this.loading = true;
    let path = this.id ? `/products/update/${this.id}` : `/products/create`;
  
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
  private getCount():void {
    this._crudSvc.getRequest(`/products/getCount`).subscribe((res: any) => {
      const { data } = res;
     this.form.patchValue({ code: (data?.id ?? 0) + 1 })
    })
  }

  public getBrands():void {
    const query = [
      `?page=${this.pageBrand}`,
      `&term=${this.termBrand}`
    ].join('');
    
    if( this.lastPageBrand && ((this.lastPageBrand < this.pageBrand) && !this.termBrand) ) return

    this._crudSvc.getRequest(`/brands/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termBrand) ? this.brandsList = [...this.brandsList,  ...data.data] : this.brandsList = data.data;
        this.lastPageBrand = data.last_page;
        this.pageBrand++;
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchBrand(event:string){

    if(event.length > 3) {
      this.termBrand = event;
      this.getBrands();
      this.setPage();
    }

    if(!event.length && this.termBrand) {
      this.setPage();
      this.termBrand = '';
      this.brandsList = []
      this.getBrands();
    }  
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageBrand = 1; 
  private setProductForm = ():void => this.form.patchValue(this.product);
}
