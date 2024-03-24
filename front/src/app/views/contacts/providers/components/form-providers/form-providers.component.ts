import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { StatesService } from 'src/app/views/settings/locals/services/states.service';

@Component({
  selector: 'app-form-providers',
  templateUrl: './form-providers.component.html',
  styleUrls: ['./form-providers.component.scss']
})
export class FormProvidersComponent implements OnInit {
  id: number;
  form: FormGroup;
  statusList = this._statusSvC.get();
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
    private _statusSvC:StatesService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.getProvider();
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      store_id: [ 1, [ Validators.required] ],
      business_name: [ null, [ Validators.required ] ],
      nit: [ null, [ Validators.required] ],
      cell_phone: [ null, [ Validators.required] ],
      landline: [ null, [] ],
      email: [ null, [ Validators.required, Validators.email] ],
      country: [ null, [ Validators.required] ],
      department: [ null, [ Validators.required] ],
      city: [ null, [ Validators.required] ],
      address: [ null, [ Validators.required] ],
      state: [ null, [ Validators.required] ],
    });
    
    if(this.id) this.getProvider()
    this.getStores();
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/contacts/providers/edit/${this.id}` : `/contacts/providers/create`;

    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contactos','proveedores']);
      }
    })
  }
  
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getProvider(){
    this._crudSvc.getRequest(`/contacts/providers/show/${this.id}`).subscribe((res: any) => {
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