import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { LocalMModel } from 'src/app/shared/interfaces/localm';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.scss']
})
export class LocalsComponent implements OnInit {

  listSubscribers: Subscription[] = [];
  limit: number = 10;
  loading: boolean = false;
  orderColumn = [
    {
          title: 'ID',
          compare: (a: LocalMModel, b: LocalMModel) => a.id - b.id,
      },
      {
          title: 'Nombre tienda',
      },
      {
          title: 'Nit',
      },
      {
          title: 'Celular',
      },
      {
          title: 'Correo',
      },
      {
          title: 'Ciudad',
      },
      {
          title: 'Estado',
      }
  ]
  page: number = 1;
  localsList:LocalMModel[];
  searchInput: any;
  term: string = '';
  totalItems:number;
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 
  
  constructor(
    private _crudSvc:CrudServices,
    private cookieSvc: CookieService
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getLocals();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getLocals():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/settings/stores/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;

        this.localsList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getLocals()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getLocals();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getLocals();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getLocals();
    });

    this.listSubscribers = [observer1$];
  }
  
  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 21);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}