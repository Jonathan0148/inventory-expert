import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-providers',
  templateUrl: './form-providers.component.html',
  styleUrls: ['./form-providers.component.scss']
})
export class FormProvidersComponent implements OnInit {
  @Input() id:number;

  form: FormGroup;
  loading:boolean;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      full_name: [ null, [ Validators.required, Validators.maxLength(150) ] ],
      email: [ null, [ Validators.required, Validators.maxLength(150)] ],
      nit: [ null, [ Validators.required, Validators.maxLength(50)] ],
      cellphone: [ null, [ Validators.required, Validators.maxLength(10)] ],
      landline: [ null, [ Validators.required, Validators.maxLength(100)] ],
      department: [ null, [ Validators.required, Validators.maxLength(150)] ],
      city: [ null, [ Validators.required, Validators.maxLength(150)] ],
      address: [ null, [ Validators.required, Validators.maxLength(150)] ]
    });
    
    if(this.id) this.getProvider()
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/providers/update/${this.id}` : `/providers/create`;

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
    this._crudSvc.getRequest(`/providers/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.form.patchValue(data);
    })
  }
}
