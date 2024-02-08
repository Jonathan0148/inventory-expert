import { Component, OnInit, ChangeDetectorRef, Input, AfterViewChecked } from '@angular/core';
import { UntypedFormArray, Validators, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ValidationsForm } from '../../../sales/validations/validations-form';

@Component({
  selector: 'app-form-invoices',
  templateUrl: './form-invoices.component.html',
  styleUrls: ['./form-invoices.component.scss']
})
export class FormInvoicesComponent implements OnInit , AfterViewChecked {

  @Input() id:number;
  
  date:Date = new Date();
  form: UntypedFormGroup;
  loading:boolean;
  typeDocumentsList: any;

  constructor(
    private fb: FormBuilder,
    private _crudSvc:CrudServices,
    private router:Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }
  
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  } 

  ngOnInit(): void {
    this.form = this.fb.group({
      cellphone: [ null, [ Validators.required ] ],
      email: [ null, [ Validators.required ] ],
      id_provider:[ null, [  Validators.required ]],
      provider:[ null, [ ]],
      nit:[null, [ Validators.required ]],
      full_name:[null, [ Validators.required ]],
      reference:[null, Validators.required],
      payment_status:[null, [ Validators.required ]],
      id_payment_method: [ null, [ Validators.required ] ],
      due_date: [ null, [ Validators.required] ],
      total:[0, [ Validators.maxLength(11), Validators.required ]],
      tax:[0, [  ]],
      bail:[null, [ Validators.maxLength(11) ]] ,
      observations:[null]
    },
    {
      validator: ValidationsForm.matchValidationOrders('bail', 'total', 'no-same')
    }); 

    if(this.id) this.getOrder();
    if(!this.id) this.getReference();
  }
  
  public submit(): void {
    this.loading = true;

    let path = this.id ? `/orders/update/${this.id}` : `/orders/create`;

    this._crudSvc.postRequest(path, this.form.value)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contabilidad','ordenes']);
      }
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getOrder(){
    this.loading = true;

    this._crudSvc.getRequest(`/orders/show/${this.id}`)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
        const { data } = res;
        this.form.patchValue(data);
        this.form.patchValue({ bail: 0 });
        this.date = data?.created_at;
    })
  }

  public getReference(){
    this._crudSvc.getRequest(`/orders/getCount`).subscribe((res: any) => {
        const { data } = res;
        this.form.patchValue({ reference: (data?.id ?? 0) + 1 })
    })
  }

}

