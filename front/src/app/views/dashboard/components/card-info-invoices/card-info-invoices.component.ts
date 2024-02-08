import { Component, OnInit } from '@angular/core';
import { CrudServices } from '../../../../shared/services/crud.service';
import { AuxiliarService } from '../../../../shared/services/auxiliar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-card-info-invoices',
  templateUrl: './card-info-invoices.component.html',
  styleUrls: ['./card-info-invoices.component.scss']
})
export class CardInfoInvoicesComponent implements OnInit {

  ordersList = [];
  today = new Date();
  page:number = 1;
  limit:number = 10;
  totalItems:number;
  loading:boolean;

  constructor(
    private _crudSvc:CrudServices,
    private _auxSvc:AuxiliarService
  ) { }

  ngOnInit(): void {
    this.getRecientsOrders()
  }

  private getRecientsOrders():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/dashboard/getTopInvoices${query}`)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
        const { data } = res;
        this.getColorForOrder(data.data);
        this.totalItems = data.total;
    })
  }

  private getColorForOrder(data:any):any {
     data.forEach(e => { e.color = this._auxSvc.colorList[this._auxSvc.getRandomNumber()]; e.shortName = this._auxSvc.getNameShort(e.full_name); })
     this.ordersList = data;
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getRecientsOrders();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getRecientsOrders();
  }

  public calculateDate(dueDate:any): any{
    return this.today > new Date(dueDate);
  }
}
