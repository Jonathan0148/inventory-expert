import { Component, Input, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Validators, UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationsForm } from '../../validations/validations-form';
import { OnExit } from 'src/app/shared/guards/form-exit.guard';
import { ModalService } from '../../../../../shared/services/modal.service';

@Component({
  selector: 'app-form-sales',
  templateUrl: './form-sales.component.html',
  styleUrls: ['./form-sales.component.scss']
})
export class FormSalesComponent implements OnInit, OnExit, AfterViewChecked {
  id:number;
  
  date:Date = new Date();
  form: UntypedFormGroup;
  loading:boolean;
  typeDocumentsList: any;
  hasSubmit: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private _crudSvc:CrudServices,
    private router:Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _modalSvc: ModalService
  ) {
    this.activatedRoute.params.subscribe((params) => {
        this.id = params.id ?? '';
      });
   }
  
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  } 

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [ this.date, [ Validators.required ] ],
      type_document:[ 0, [ ]],
      document:[null, [ ]],
      full_name:[null, [ ]],
      cell_phone:[null, [ ]],
      client_exists:[ !!this.id, [ ]],
      customer_id:[null, [ ]],
      reference:[null, Validators.required],
      status:[null, [ Validators.required ]],
      payment_type_id: [ null, [ Validators.required ] ],
      store_id: [ 1, [ Validators.required ] ],
      total:[0, [  ]],
      tax: [ 0, [ Validators.required, Validators.max(100), Validators.min(0)] ],
      subtotal:[0, [  ]],
      bail:[null, [  ]],
      products: this.fb.array([]),
      observations:[null],
    },
    {
      validator: ValidationsForm.matchValidation('bail', 'total', 'no-same')
    }); 

    if(this.id) this.getSale();
    if(!this.id) this.getReference();
  }
  
  public submit(): void {
    this.hasSubmit = true;
    this.loading = true;

    let path = this.id ? `/accounting/sales/edit/${this.id}` : `/accounting/sales/create`;
    
    const body = {
      productsForm: this.setInfoProducts(),
      ...this.form.value
    }
    
    this._crudSvc.postRequest(path, body)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
      const { success } = res;
      if (success) {
        this.router.navigate(['/', 'contabilidad','ventas']);
      }
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getSale(){
    this.loading = true;
    this._crudSvc.getRequest(`/accounting/sales/show/${this.id}`)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
        const { data } = res;
        this.form.patchValue(data);
        this.form.patchValue({ bail: 0});
        this.setFormData(data);
        this.date = data?.created_at;
    })
  }

  public getReference(){
    this._crudSvc.getRequest(`/accounting/sales/getReference`).subscribe((res: any) => {
        const { data } = res;
        
        this.form.patchValue({ reference: data })
    })
  }
  
  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  get products():UntypedFormArray{
    return this.form.controls["products"] as UntypedFormArray;
  }

  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setInfoProducts():any[] {
    let products = [];    
    this.products.value.forEach(element => {
        products.push({
          sale_id: element?.sale_id,
          product_id: element?.product_id,
          amount: element?.amount,
          price: element?.price
        })
    });
    return products;
  }

  private setFormData(data:any):void {
    const { customer, details } = data;
    
    this.form.patchValue(customer)
    this.setProductsForm(details);
  }

  private setProductsForm(details: any ):void { 
    details.forEach(detail => {
      const lessonForm = this.fb.group({
        sale_id: [detail?.id],
        product_id: [detail.product?.id],
        image: [detail?.product?.images[0]?.response?.url],
        name: [detail.product.name],
        amount: [detail?.amount],
        stock: [ (this.id) ? (detail.product?.stock + detail?.amount) : detail.product?.stock],
        price:[detail?.price],
        subtotal:[detail.amount * detail?.price],
      },   
      {
        validator: ValidationsForm.match('stock', 'amount', 'no-same')
      });      
      this.products.push(lessonForm);
    });         
  }

  // ------------------------------------------------------
  // ------------------------ MODAL ----------------------- 
  // ------------------------------------------------------

  async onExit(){
    if(this.form.touched && (this.form.dirty || this.products.length) && !this.hasSubmit){
      try {
        let res = await this._modalSvc.confirm(`Tienes cambios sin guardar`,`<p>Si abandonas esta página perderas tus cambios.<br> <strong>¿Estas
        seguro que quieres abandonar la página?<strong></p>`);
        return res;
      } catch (error) {
          return false;
      }
    }
    return true;
  }
}
