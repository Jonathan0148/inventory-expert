import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Router } from '@angular/router';
import { ValidationsForm } from '../../validations/validations-form';

@Component({
  selector: 'app-form-bails',
  templateUrl: './form-bails.component.html',
  styleUrls: ['./form-bails.component.scss']
})
export class FormBailsComponent implements OnInit {
  @Input() id:number;
  bailId:number;
  form: UntypedFormGroup;
  loading:boolean;
  typeDocumentsList:any;
  typePersonsList:any;
  paymentMethodList:any;
  totalBails:number;
  total:number;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router 
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      payment_type_id: [ null, [ Validators.required ] ],
      price: [ null, [ Validators.required] ],
      total_bails: [ null, [] ],
      total: [ null, [] ],
      sale_id: [ this.id , [ Validators.required] ],
    },
    {
      validator: ValidationsForm.bailsValidation('price', 'no-same')
    });

    if(this.id) this.getSale()
    this.getPaymentMethods();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.bailId ? `/accounting/bails/update/${this.bailId}` : `/accounting/bails/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contabilidad','ventas','abonos',this.id]);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  public getSale(){
    this._crudSvc.getRequest(`/accounting/sales/show/${this.id}`).subscribe((res: any) => {
      const { data} = res;
      this.form.patchValue(data);
    })
  }

  private getPaymentMethods():void {
    this._crudSvc.getRequest(`/accounting/sales/getPaymentMethods`).subscribe((res: any) => {
        const { data } = res;
        this.paymentMethodList = data;
    })
  }
}