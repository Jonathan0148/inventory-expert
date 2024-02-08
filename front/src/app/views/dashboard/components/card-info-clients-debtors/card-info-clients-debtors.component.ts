import { Component, OnInit } from '@angular/core';
import { CrudServices } from '../../../../shared/services/crud.service';
import { AuxiliarService } from '../../../../shared/services/auxiliar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-card-info-clients-debtors',
  templateUrl: './card-info-clients-debtors.component.html',
  styleUrls: ['./card-info-clients-debtors.component.scss']
})
export class CardInfoClientsDebtorsComponent implements OnInit {

  clientsList = [];
  today = new Date();
  page:number = 1;
  limit:number = 10;
  totalItems:number;
  loading:boolean;
  expandSet = new Set<number>();

  constructor(
    private _crudSvc:CrudServices,
    private _auxSvc:AuxiliarService
  ) { }

  ngOnInit(): void {
    this.getRecientsClients()
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  private getRecientsClients():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&limit=${this.limit}`
    ].join('');

      this._crudSvc.getRequest(`/dashboard/getTopDebtors${query}`)
      .pipe(finalize( () => this.loading = false))
      .subscribe((res: any) => {
          const { data } = res;
          this.getColorForClients(data.data);
          this.totalItems = data.total;
      })
  }

  private getColorForClients(data:any):any {
     data.forEach(e => { e.color = this._auxSvc.colorList[this._auxSvc.getRandomNumber()]; e.shortName = this._auxSvc.getNameShort(e.full_name); })
     this.clientsList = data;
  }  
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getRecientsClients();
  }

  public pageSizeChanged(limit: number):void {
    this.limit = limit; this.page = 1;
    this.getRecientsClients();
  }

}
