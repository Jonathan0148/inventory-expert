import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { TypeDocumentModel } from '../../../../../shared/interfaces/type-document';
import { TypePersonModel } from '../../../../../shared/interfaces/type-person';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-info-client-sales',
  templateUrl: './info-client-sales.component.html',
  styleUrls: ['./info-client-sales.component.scss']
})
export class InfoClientSalesComponent implements OnInit {

  @Input() form:UntypedFormGroup;
  typeDocumentsList: TypeDocumentModel[];  
  typePersonsList:TypePersonModel[];
  isClient:boolean = false;
  loading:boolean;

  constructor(
    private _crudSvc:CrudServices,
  ) { }

  ngOnInit(): void {
    this.getTypeDocuments();    
    this.getTypePersons();
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  private getTypeDocuments():void {
    this._crudSvc.getRequest(`/users/getTypeDocuments`).subscribe((res: any) => {
        const { data } = res;
        this.typeDocumentsList = data;
    })
  }

  private getTypePersons():void {
    this._crudSvc.getRequest(`/customers/getTypePersons`).subscribe((res: any) => {
        const { data } = res;
        this.typePersonsList = data;
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------

  public onChangeDocument(event){
    this.loading = true;
    this.resetFields()
    if(!event) {
      this.isClient = false;
      return
    } 

    let data = {
      document:event,
      type_document:this.form.get('id_type_document').value,
    }

     this._crudSvc.postRequest(`/customers/getForDocuments`, data)
     .pipe(finalize( () => this.loading = false))
     .subscribe((res: any) => {
      const { success,data } = res;
      if(success){ 
        this.isClient = data ? true : false; 
        this.form.patchValue(data)       
      } 
    })
  }

  private resetFields() {
    this.form.patchValue({ cellphone:null, email:null, id_type_document:1, full_name:null, client_exists:false })
  }
}
