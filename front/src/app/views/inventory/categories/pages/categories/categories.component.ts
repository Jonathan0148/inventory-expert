import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { CategoryModel } from '../../../../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  tabs:any = [
    {'title':'categories.title','url':['/','inventario','categorias']},
    {'title':'subcategories.title','url':['/','inventario','subcategorias']}
  ]

  listSubscribers: Subscription[] = [];
  limit: number = 10;
  loading: boolean = false;
  orderColumn = [
    {
          title: 'ID',
          compare: (a: BrandModel, b: BrandModel) => a.id - b.id,
      },
      {
          title: 'Código',
      },
      {
          title: 'Nombre',
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
  
  constructor(
    private _crudSvc:CrudServices 
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getCategories();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------
  private getCategories():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/categories/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
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
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
  

}
