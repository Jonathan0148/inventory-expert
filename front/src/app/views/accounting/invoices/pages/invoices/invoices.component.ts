import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { InvoicesModel } from '../../../../../shared/interfaces/invoices';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  listSubscribers: Subscription[] = [];
  loading: boolean = false;
  limit: number = 10;
  orderColumn = [
      {
          title: 'ID',
          compare: (a: InvoicesModel, b: InvoicesModel) => a.id - b.id,
          priority: false
      },
      {
          title: 'Referencia',
      },
      {
          title: 'Proveedor',
      },
      {
          title: 'Metodo pago',
      },
      {
        title: 'Fecha',
      },
      {
        title: 'Valor',
      },
      {
        title: 'Estado'
      },
      {
          title: ''
      }
  ]
  page: number = 1;
  searchInput: any;
  term: string = '';
  totalItems:number;
  invoicesList:InvoicesModel[];
  date:Date = null;
  type:string = '';


  constructor( 
    private _crudSvc:CrudServices,
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getSales();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------
  private getSales():void {
    this.loading = true;

    const body = {  
      page:  this.page,
      term: this.term,
      limit:this.limit,
      date:this.date,
      type:this.type,
    };
    

    this._crudSvc.postRequest(`/orders/index`, body).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        this.invoicesList = data.data;
        this.totalItems = data.total;
      })
  }
  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------
  public search(): void {
      this.term = this.searchInput;
      this.getSales()
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getSales();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getSales();
  }

  public onChangeFilter(event:any){
    const { date, type } = event;
    this.date = date; this.type = type;
    this._crudSvc.requestEvent.emit('');
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getSales();
    });

    this.listSubscribers = [observer1$];
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
  
}
