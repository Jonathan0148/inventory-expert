import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { StatesService } from 'src/app/views/settings/locals/services/states.service';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { TypeDocumentsService } from 'src/app/views/settings/users/services/type-documents.service';

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.scss']
})
export class FormCustomersComponent implements OnInit {
  id: number;
  form: FormGroup;
  statusList = this._statusSvC.get();
  loading:boolean;
  typeDocumentsList = this._typeDocumentsSvC.get();
  typePersonsList:any;
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
    private _typeDocumentsSvC: TypeDocumentsService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      if(this.id) {
        this.getCustomer();
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        store_id: [ 1, [ Validators.required] ],
        full_name: [ null, [ Validators.required, Validators.maxLength(255)] ],
        type_document: [ null, [ Validators.required] ],
        document: [ null, [ Validators.required, Validators.maxLength(20)] ],
        cell_phone: [ null, [ Validators.maxLength(10)] ],
        email: [ null, [ Validators.email] ],
        state: [ null, [ Validators.required] ]
    });
    
    if(this.id) this.getCustomer()
    this.getStores();
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/contacts/customers/edit/${this.id}` : `/contacts/customers/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contactos','clientes']);
      }
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getCustomer(){
    this._crudSvc.getRequest(`/contacts/customers/show/${this.id}`).subscribe((res: any) => {
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
