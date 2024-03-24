import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { StoreModel } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.scss']
})
export class FormBrandComponent implements OnInit {
  id: number;
  form: FormGroup;
  loading:boolean;
  storesList: StoreModel[] = [];
  pageStore: number = 1;
  termStore: string = '';
  lastPageStore: number;
  isDetail: boolean = false;
  basicLicense: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.getBrand();
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        store_id: [ 1, [ Validators.required ] ],
        name: [ null, [ Validators.required ] ],
        description: [ null, [ ] ]
    });

    if(this.id) this.getBrand()
    this.getStores();
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/inventory/brands/edit/${this.id}` : `/inventory/brands/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'inventario','marcas']);
      }
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getBrand(){
    this._crudSvc.getRequest(`/inventory/brands/show/${this.id}`).subscribe((res: any) => {
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

  private validateLocal(){
    this._crudSvc.getRequest(`/settings/stores/validateLocal`).subscribe((res: any) => {
      const { data } = res;
      if (data == 1) this.basicLicense = true; 
    })
  }
}
