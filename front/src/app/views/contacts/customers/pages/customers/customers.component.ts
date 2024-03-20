import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/shared/interfaces/customer';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  listSubscribers: Subscription[] = [];
  loading: boolean = false;
  limit: number = 10;
  orderColumn = [
      {
          title: 'ID',
          compare: (a: CustomerModel, b: CustomerModel) => a.id - b.id,
          priority: false
      },
      {
        title: 'Nombre Completo',
      },
      {
        title: 'Documento',
      },
      {
        title: 'Correo Electrónico',
      },
      {
        title: 'Local',
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
  term:string = '';
  totalItems:number;
  customersList:CustomerModel[];
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 
  
  constructor( 
    private _crudSvc:CrudServices,
    private cookieSvc: CookieService
    ){}

  ngOnInit(): void {
    this.getCustomers();
    this.listenObserver();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getCustomers():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/contacts/customers/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        this.customersList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getCustomers()
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getCustomers();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getCustomers();
  }
  
  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getCustomers();
    });

    this.listSubscribers = [observer1$];
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 17);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}
