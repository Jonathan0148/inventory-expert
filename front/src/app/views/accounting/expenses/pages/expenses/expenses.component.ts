import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { ExpenseModel } from '../../../../../shared/interfaces/expense';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  listSubscribers: Subscription[] = [];
  limit: number = 10;
  loading: boolean = false;
  orderColumn = [
    {
      title: 'ID',
      compare: (a: ExpenseModel, b: ExpenseModel) => a.id - b.id,
    },
    {
      title: 'Descripción',
    },
    {
      title: 'Valor',
    },
    {
      title: 'Fecha',
    },
    {
      title: 'Local',
    },
    {
      title: ''
    }
  ]
  page: number = 1;
  expensesList:ExpenseModel[];
  searchInput: any;
  term: string = '';
  totalItems:number;
  date:Date = null;
  type:string = '';
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 

  constructor(
    private _crudSvc:CrudServices,
    private cookieSvc: CookieService
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getExpenses();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getExpenses():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/accounting/expenses/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;

        this.expensesList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------
  public search(): void {
      this.term = this.searchInput;
      this.getExpenses()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getExpenses();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getExpenses();
  }

  public onChangeFilter(event:any){
    const { date, type } = event;
    this.date = date; this.type = type;
    this._crudSvc.requestEvent.emit('');
  }


  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getExpenses();
    });

    this.listSubscribers = [observer1$];
  }
  
  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 19);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}
