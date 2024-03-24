import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StoreModel } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-form-categories',
  templateUrl: './form-categories.component.html',
  styleUrls: ['./form-categories.component.scss']
})
export class FormCategoriesComponent implements OnInit {
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
        this.getCategory();
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
    
    if(this.id) this.getCategory();
    this.getStores();
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/inventory/categories/edit/${this.id}` : `/inventory/categories/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'inventario','categorias']);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getCategory(){
    this._crudSvc.getRequest(`/inventory/categories/show/${this.id}`).subscribe((res: any) => {
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