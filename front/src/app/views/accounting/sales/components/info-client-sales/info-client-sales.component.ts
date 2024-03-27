import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { TypePersonModel } from '../../../../../shared/interfaces/type-person';
import { finalize } from 'rxjs/operators';
import { TypeDocumentsService } from 'src/app/views/settings/users/services/type-documents.service';

@Component({
  selector: 'app-info-client-sales',
  templateUrl: './info-client-sales.component.html',
  styleUrls: ['./info-client-sales.component.scss']
})
export class InfoClientSalesComponent implements OnInit {
  @Input() form:UntypedFormGroup;
  typeDocumentsList = this._typeDocumentsSvC.get();
  typePersonsList:TypePersonModel[];
  isClient:boolean = false;
  loading:boolean;
  @Input() hasAdminModule:boolean;

  constructor(
    private _crudSvc:CrudServices,
    private _typeDocumentsSvC: TypeDocumentsService,
  ) { }

  ngOnInit(): void { }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

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
      type_document:this.form.get('type_document').value,
    }

     this._crudSvc.postRequest(`/contacts/customers/getForDocuments`, data)
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
    this.form.patchValue({ type_document:0, full_name:null, cell_phone:null, client_exists:false })
  }
}