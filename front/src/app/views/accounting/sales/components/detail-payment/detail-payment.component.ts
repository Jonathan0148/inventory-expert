import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { StatusService } from '../../services/status.service';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { ProductsDetailService } from '../../services/products-detail.service';
import { Subscription } from 'rxjs';
import { StoreModel } from 'src/app/shared/interfaces/store';

@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss']
})
export class DetailPaymentComponent implements OnInit, OnDestroy {
  @Input() form:UntypedFormGroup;
  @Input() products:UntypedFormArray;
  @Input() id:number;
  @Output() submited = new EventEmitter<boolean>();
  listSubscribers: Subscription[] = [];
  statusList:StatusModel[] = this._statusSvC.get();
  paymentMethodList:any;
  storesList: StoreModel[] = [];
  pageStore: number = 1;
  termStore: string = '';
  lastPageStore: number;
  basicLicense: boolean = false;
  hasProducts: boolean = false;
  @Input() hasAdminModule:boolean;

  constructor(
    private _statusSvC: StatusService,
    private _crudSvc:CrudServices,
    private _productDetailSvC:ProductsDetailService,
  ) { }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.listenObserver();
    setTimeout(() => {
      this.validateHasProducts();
    }, 3000);
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------

  private getPaymentMethods():void {
    this._crudSvc.getRequest(`/accounting/sales/getPaymentMethods`).subscribe((res: any) => {
        const { data } = res;
        this.paymentMethodList = data;
    })
  }

  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------

  public onChangeStatus(): void {
    this.form.get('bail').clearValidators();
    if((!this.id && this.form.get('status').value === 2)) this.form.get('bail').setValidators([Validators.required]);
    this.form.get('bail').updateValueAndValidity();
  }

  public onChangeTax():void {
    this._productDetailSvC.setChangePrice$(true);
  }

  public onClickSubmit():void {
    this.submited.emit(true)
  }

  //------------------------------------------------------------------------
  //---------------------AUXILIAR FUNCTIONS---------------------------------
  //------------------------------------------------------------------------

  private calculatePrice(): void {
      let total = 0, subtotal = 0, tax = this.form.get('tax').value;
      this.products.value.forEach(element => {
        subtotal += (element.price * element.amount);
      }); 
      
      total = (subtotal * tax / 100) + subtotal;
      this.form.patchValue({ subtotal, total })
  }

  private listenObserver = () => {
    const observer1$ = this._productDetailSvC.changeProduct$.subscribe((res) => {
      this.calculatePrice();
      this.validateHasProducts();
    });

    this.listSubscribers = [observer1$];
  }

  private validateHasProducts(){
    if (this.products.value.length >= 1) this.hasProducts = true; else this.hasProducts = false;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}