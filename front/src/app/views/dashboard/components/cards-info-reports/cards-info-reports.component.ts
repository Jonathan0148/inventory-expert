import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudServices } from '../../../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cards-info-reports',
  templateUrl: './cards-info-reports.component.html',
  styleUrls: ['./cards-info-reports.component.scss']
})
export class CardsInfoReportsComponent implements OnInit, OnDestroy {
  loading:boolean;
  listSubscribers: Subscription[] = [];
  totalSales: number = 0;
  totalSalesCount: number = 0;
  totalProductsCount: number = 0;
  totalProductsValue: number = 0;
  totalClientsCount: number = 0;
  totalUsersCount: number = 0;
  body = { date: new Date(), type: '' }
  date:Date = null;
  type:string = '';

  constructor(
    private _crudSvc: CrudServices,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getSalesTotal()
    this.getCountSales()
    this.getCountProducts()
    this.getValueProducts()
    this.getCountClients()
    this.getCountUsers()
    this.listenObserver();
  }

  private getSalesTotal(): void {
    this._crudSvc.postRequest(`/dashboard/getSales`, this.body).pipe(finalize( () => this.loading = false )).subscribe((res: any) => {
      const { data } = res;
      this.totalSales = data;
    })
  }

  private getCountSales(): void {
    this._crudSvc.postRequest(`/dashboard/getCountSales`, this.body).pipe(finalize( () => this.loading = false )).subscribe((res: any) => {
      const { data } = res;
      this.totalSalesCount = data;
    })
  }

  private getCountProducts(): void {
    this._crudSvc.getRequest(`/dashboard/getCountProducts`).pipe(finalize( () => this.loading = false )).subscribe((res: any) => {
      const { data } = res;
      this.totalProductsCount = data;
    })
  }

  private getValueProducts(): void {
    this._crudSvc.postRequest(`/dashboard/getValueProducts`, this.body).pipe(finalize( () => this.loading = false )).subscribe((res: any) => {
      const { data } = res;
      this.totalProductsValue = data;
    })
  }

  private getCountClients(): void {
    this._crudSvc.postRequest(`/dashboard/getCountClients`, this.body).pipe(finalize( () => this.loading = false )).subscribe((res: any) => {
      const { data } = res;
      this.totalClientsCount = data;
    })
  }

  private getCountUsers(): void {
    this._crudSvc.getRequest(`/dashboard/getCountUsers`).pipe(finalize( () => this.loading = false )).subscribe((res: any) => {
      const { data } = res;
      this.totalUsersCount = data;
    })
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getSalesTotal()
      this.getCountSales()
      this.getCountProducts()
      this.getValueProducts()
      this.getCountClients()
      this.getCountUsers()
    });

    this.listSubscribers = [observer1$];
  }
  

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

  public onChangeFilter(event:any){
    this.loading = true;
    const { date, type } = event;
    this.date = date; this.type = type;
    this.body = { date, type }
    this._crudSvc.requestEvent.emit('');
  }

}
