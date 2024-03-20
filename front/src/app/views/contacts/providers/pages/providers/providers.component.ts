import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProviderModel } from 'src/app/shared/interfaces/provider';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  listSubscribers: Subscription[] = [];
  loading: boolean = false;
  limit: number = 10;
  orderColumn = [
      {
          title: 'ID',
          compare: (a: ProviderModel, b: ProviderModel) => a.id - b.id,
          priority: false
      },
      {
        title: 'Nombre Proveedor',
      },
      {
        title: 'NIT',
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
  providersList:ProviderModel[];
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 
  
  constructor( 
    private _crudSvc:CrudServices,
    private cookieSvc: CookieService
    ){}

  ngOnInit(): void {
    this.getProviders();
    this.listenObserver();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getProviders():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/contacts/providers/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        this.providersList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getProviders()
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getProviders();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getProviders();
  }
  
  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getProviders();
    });

    this.listSubscribers = [observer1$];
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 20);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}
