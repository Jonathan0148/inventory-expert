import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Router } from '@angular/router';
import { ValidationsForm } from '../../../sales/validations/validations-form';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-bails',
  templateUrl: './form-bails.component.html',
  styleUrls: ['./form-bails.component.scss']
})
export class FormBailsComponent implements OnInit {

  @Input() id:number;
  idBail:number;
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
        id_payment_method: [ null, [ Validators.required ] ],
        price: [ null, [ Validators.required] ],
        total_bails: [ null, [] ],
        total: [ null, [] ],
        id_order: [ this.id , [ Validators.required] ],
    },
    {
      validator: ValidationsForm.bailsValidation('price', 'no-same')
    });

    if(this.id) this.getOrder()
    this.getPaymentMethods();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.idBail ? `/bails_order/update/${this.idBail}` : `/bails_order/create`;
    
    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contabilidad','ordenes','abonos',this.id]);
      }
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getOrder(){
    this._crudSvc.getRequest(`/orders/show/${this.id}`).subscribe((res: any) => {
      const { data} = res;
      this.form.patchValue(data);
    })
  }

  private getPaymentMethods():void {
    this._crudSvc.getRequest(`/sales/getPaymentMethods`).subscribe((res: any) => {
        const { data } = res;
        this.paymentMethodList = data;
    })
  }
}
