import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { LocalModel } from '../../../../../shared/interfaces/local';
import { Subscription } from 'rxjs';
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
      compare: (a: LocalModel, b: LocalModel) => a.id - b.id,
    },
    {
      title: 'Nómbre',
    },
    {
      title: 'Descripción',
    },
    {
      title: 'Local',
    },
    {
      title: ''
    }
  ]
  page: number = 1;
  sectionsList:LocalModel[];
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
    this.getSections();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getSections():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/inventory/distribution-local/shelves/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;

        this.sectionsList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getSections()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getSections();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getSections();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getSections();
    });

    this.listSubscribers = [observer1$];
  }
  
  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 13);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }

  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}