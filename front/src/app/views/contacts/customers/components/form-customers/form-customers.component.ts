import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-customers',
  templateUrl: './form-customers.component.html',
  styleUrls: ['./form-customers.component.scss']
})
export class FormCustomersComponent implements OnInit {
  @Input() id:number;

  form: FormGroup;
  loading:boolean;
  typeDocumentsList:any;
  typePersonsList:any;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        full_name: [ null, [ Validators.required, Validators.maxLength(255), Validators.minLength(5)] ],
        email: [ null, [ Validators.required] ],
        id_type_document: [ null, [ Validators.required] ],
        document: [ null, [ Validators.required, Validators.maxLength(20)] ],
        id_type_person: [ null, [ Validators.required] ],
        cellphone: [ null, [ Validators.required, Validators.maxLength(10)] ],
        address: [ null, [ Validators.required] ]
    });
    
    if(this.id) this.getCustomer()
    this.getTypeDocuments();
    this.getTypePersons();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/customers/update/${this.id}` : `/customers/create`;
    
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
    this._crudSvc.getRequest(`/customers/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }

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
}
