import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  listSubscribers: Subscription[] = [];
  limit: number = 10;
  loading: boolean = false;
  orderColumn = [
    {
      title: 'ID',
      compare: (a: BrandModel, b: BrandModel) => a.id - b.id,
    },
    {
      title: 'Nombre',
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
  brandsList:BrandModel[];
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
    this.getBrands();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getBrands():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/inventory/brands/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;

        this.brandsList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getBrands()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getBrands();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getBrands();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getBrands();
    });

    this.listSubscribers = [observer1$];
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 14);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}