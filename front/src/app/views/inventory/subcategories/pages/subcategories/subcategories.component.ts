import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import { SubcategoryModel } from '../../../../../shared/interfaces/subcategory';
import { CategoryModel } from '../../../../../shared/interfaces/category';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {
 
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
          compare: (a: SubcategoryModel, b: SubcategoryModel) => a.id - b.id,
      },
      {
          title: 'Código',
      },
      {
          title: 'Nombre',
      },
      {
        title: 'Categoría',
      },
      {
          title: ''
      }
  ]
  page: number = 1;
  subcategoriesList:SubcategoryModel[];
  categoriesList:CategoryModel[] = [] ;
  selectedCategory:CategoryModel = null;
  searchInput: any;
  term: string = '';
  totalItems:number;
  pageCategory: number = 1;
  termCategory: string = '' ;
  lastPageCategory: any;
  
  constructor(
    private _crudSvc:CrudServices 
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getSubcategories();
    this.getCategories();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------
  private getSubcategories():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`,
      `&category=${this.selectedCategory ?? ''}`,
    ].join('');

    this._crudSvc.getRequest(`/subcategories/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        this.subcategoriesList = data.data;
        this.totalItems = data.total;
      })
  }

  public getCategories():void {
    const query = [
      `?page=${this.pageCategory}`,
      `&term=${this.termCategory}`
    ].join('');
    
    if( this.lastPageCategory && ((this.lastPageCategory < this.pageCategory) && !this.termCategory) ) return

    this._crudSvc.getRequest(`/categories/index${query}`).subscribe((res: any) => {
        const { data } = res;
        (!this.termCategory) ? this.categoriesList = [...this.categoriesList,  ...data.data] : this.categoriesList = data.data;
        this.lastPageCategory = data.last_page;
        this.pageCategory++;
    })
  }
  //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchCategory(event:string){

    if(event?.length > 3) {
      this.termCategory = event;
      this.getCategories();
      this.setPage();
    }

    if(!event?.length && this.termCategory) {
      this.setPage();
      this.termCategory = '';
      this.categoriesList = []
      this.getCategories();
    }  
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------
  public search(): void {
      this.term = this.searchInput;
      this.getSubcategories()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getSubcategories();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getSubcategories();
  }

  public onChangeCategory(category:CategoryModel):void{
    this.selectedCategory = category;
    this.getSubcategories();
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
  
  //------------------------------------------------------------------------
  //------------------------AUXILIAR FUNCTIONS------------------------------
  //------------------------------------------------------------------------
  private setPage = ():number => this.pageCategory = 1; 
}