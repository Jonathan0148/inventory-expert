import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { StoreModel } from 'src/app/shared/interfaces/store';
import { CrudServices } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.component.html',
  styleUrls: ['./form-store.component.scss']
})
export class FormStoreComponent implements OnInit {
  @Input() form:UntypedFormGroup;
  storesList: StoreModel[] = [];
  pageStore: number = 1;
  termStore: string = '';
  lastPageStore: number;
  basicLicense: boolean = false;

  constructor(
    private _crudSvc:CrudServices,
    ) { }

  ngOnInit(): void {
    this.getStores();
    this.validateLocal();
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