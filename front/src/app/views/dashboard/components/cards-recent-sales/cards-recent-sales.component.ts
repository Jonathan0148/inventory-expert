import { Component, OnInit } from '@angular/core';
import { CrudServices } from '../../../../shared/services/crud.service';
import { AuxiliarService } from '../../../../shared/services/auxiliar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cards-recent-sales',
  templateUrl: './cards-recent-sales.component.html',
  styleUrls: ['./cards-recent-sales.component.scss']
})
export class CardsRecentSalesComponent implements OnInit {
  ordersList = []    
  loading:boolean; 

  constructor(
    private _crudSvc:CrudServices,
    private _auxSvc:AuxiliarService
  ) { }

  ngOnInit(): void {
    this.getRecentsSales()
  }

  private getRecentsSales():void {
    this.loading = true;

    this._crudSvc.getRequest(`/dashboard/getRecentSales`)
    .pipe(finalize( () => this.loading = false ))
    .subscribe((res: any) => {
        const { data } = res;
        this.getColorForSale(data.data);
    })
  }

  private getColorForSale(data:any):any {
     data.forEach(e => { e.color = this._auxSvc.colorList[this._auxSvc.getRandomNumber()]; e.shortName = this._auxSvc.getNameShort(e.customer.full_name);  })
     this.ordersList = data;
  }

}
