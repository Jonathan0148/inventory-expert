import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { TypePersonModel } from '../../../../../shared/interfaces/type-person';
import { TypeDocumentModel } from '../../../../../shared/interfaces/type-document';
import { UntypedFormGroup } from '@angular/forms';
import { ProviderModel } from '../../../../../shared/interfaces/provider';

@Component({
  selector: 'app-info-providers-order',
  templateUrl: './info-providers-order.component.html',
  styleUrls: ['./info-providers-order.component.scss']
})
export class InfoProvidersOrderComponent implements OnInit {

  @Input() form:UntypedFormGroup;
  providersList:ProviderModel[] = [];
  isClient:boolean = false;
  loading:boolean;
  pageProvider:number = 1;
  lastPageProvider:number;
  termProvider:string = '';
  providerSelected:ProviderModel[];

  constructor(
    private _crudSvc:CrudServices,
  ) { }

  ngOnInit(): void {
    this.getProviders();  
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getProviders():void {
    this.loading = true;
    const query = [
      `?page=${this.pageProvider}`,
      `&term=${this.termProvider}`
    ].join('');

    if( this.lastPageProvider && ((this.lastPageProvider < this.pageProvider) && !this.termProvider) ) return

    this._crudSvc.getRequest(`/providers/index${query}`)
    .pipe(finalize(() => this.loading = false ))
    .subscribe((res: any) => {
        const { data } = res;
        (!this.termProvider) ? this.providersList = [...this.providersList,  ...data.data] : this.providersList = data.data;
        this.lastPageProvider = data.last_page;
        this.pageProvider++;
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onChangeProvider(event:ProviderModel){
    this.resetFields()
    if(!event) return
    this.form.patchValue({ id_provider: event.id });
    this.form.patchValue(event);      
  }

  public onSearchProvider(event:string){

    if(event.length > 3) {
      this.termProvider = event;
      this.getProviders();
      this.setPage();
    }

    if(!event.length && this.termProvider) {
      this.setPage();
      this.termProvider = '';
      this.providersList = []
      this.getProviders();
    }  
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageProvider = 1; 

  private resetFields() {
    this.form.patchValue({ cellphone:null, email:null, full_name:null, nit:null, id_provider:null })
  }
}