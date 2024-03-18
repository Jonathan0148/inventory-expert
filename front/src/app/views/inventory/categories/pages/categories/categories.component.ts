import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { CategoryModel } from '../../../../../shared/interfaces/category';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
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
  categoriesList:CategoryModel[];
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
    this.getCategories();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------}
  private getCategories():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/inventory/categories/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;

        this.categoriesList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getCategories()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getCategories();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getCategories();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getCategories();
    });

    this.listSubscribers = [observer1$];
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 15);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}