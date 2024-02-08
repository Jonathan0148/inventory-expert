import { Component, OnInit } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ExpenseModel } from '../../../../../shared/interfaces/expense';
import { BailModel } from 'src/app/shared/interfaces/bail';
import { SalesModel } from '../../../../../shared/interfaces/sales';
import { finalize } from 'rxjs/operators';
import { DateServicesService } from '../../../../../shared/services/date-services.service';
import { BalanceModel } from '../../../../../shared/interfaces/balance';
import { InvoiceModel } from '../../../../../shared/interfaces/invoice';
import { FilesService } from '../../../../../shared/services/file.service';

@Component({
  selector: 'app-closing-dayling',
  templateUrl: './closing-dayling.component.html',
  styleUrls: ['./closing-dayling.component.scss']
})
export class ClosingDaylingComponent implements OnInit {
  date:Date = new Date();
  type:string = 'day';
  salesClosing:SalesModel | any;
  bailsClosing:BailModel | any;
  balanceClosing:BalanceModel | any;
  expensesClosing:ExpenseModel | any;
  invoicesClosing:InvoiceModel | any;
  bailsInvoicesClosing:InvoiceModel | any;
  shoppingsClosing:any;
  isSpinning:boolean;

  constructor(
    private _crudSvc:CrudServices,
    private _dateSvc:DateServicesService,
    private _fileSvc: FilesService
  ) { }

  ngOnInit(): void {
    this.closingDayling(this._dateSvc.getDate(this.date, this.type));
  }

  private closingDayling(date:Date | number | string):void {
    this.isSpinning = true; 
    
    this._crudSvc.postRequest(`/reports/closingDayling`, { date, type: this.type })
    .pipe(finalize(() => this.isSpinning = false))
    .subscribe((res: any) => {
      const { data } = res;

      this.salesClosing = data?.sales;
      this.bailsClosing = data?.bails;
      this.expensesClosing = data?.expenses;
      this.balanceClosing = data?.balance;
      this.invoicesClosing = data?.invoices;
      this.bailsInvoicesClosing = data?.bailsInvoices;
      this.shoppingsClosing = data?.buys;
    })
  }

  public changeDate(event:any): void { 
    const { date, type } = event;
    this.type = type;
    this.date = date;
    this.closingDayling(this._dateSvc.getDate(date, type)); 
  }

  public downloadReport(): void {
    this._fileSvc.exportFilePOST(`/reports/exportClosing`, { date: this._dateSvc.getDate(this.date, this.type) , type: this.type } ,'Reporte cierre');
  }

}
