import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { StoreModel } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-form-locals',
  templateUrl: './form-locals.component.html',
  styleUrls: ['./form-locals.component.scss']
})
export class FormLocalsComponent implements OnInit, OnChanges {
  id: number;
  @Input() section:any;
  @Output() isEditEmit = new EventEmitter<boolean>();
  
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
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.section.currentValue) this.setSectionForm()
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      store_id: [ 1, [ Validators.required ] ],
      name: [ null, [ Validators.required ] ],
      description: [ null, [ ] ]
    });
    this.getStores();
    this.validateLocal();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/inventory/distribution-local/shelves/edit/${this.id}` : `/inventory/distribution-local/shelves/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success, data } = res;
      if (success) {
        if(this.id) this.isEditEmit.emit(this.form.value) 
        this.router.navigate(['/', 'inventario','local','editar', this.id || data.id]);
      }
    })
  }

  private setSectionForm():void{ this.form.patchValue(this.section); }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

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