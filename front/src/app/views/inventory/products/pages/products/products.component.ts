import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { ProductModel } from '../../../../../shared/interfaces/product';
import { Subscription } from 'rxjs';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { CategoryModel } from '../../../../../shared/interfaces/category';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { ModalImportComponent } from '../../components/modal-import/modal-import.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  @Input() isModal:boolean; 
  
  listSubscribers: Subscription[] = [];
  loading: boolean = false;
  limit: number = 10;
  orderColumn = [
    {
      title: 'ID',
      compare: (a: ProductModel, b: ProductModel) => a.id - b.id,
      priority: false
    },
    {
      title: 'Imagen',
    },
    {
      title: 'Referencia',
    },
    {
      title: 'Nombre',
    },
    {
      title: 'Categorías',
    },
    {
      title: 'Precio Venta',
    },
    {
      title: 'Stock'
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
  productsList:ProductModel[];
  selectedStatus:StatusModel;
  selectedCategory:CategoryModel;
  selectedBrand:BrandModel;
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 

  constructor( 
    private _crudSvc:CrudServices,
    private modalService: NzModalService,
    private cookieSvc: CookieService
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getProducts();
    this.validateOrderColumnTable();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------
  
  private getProducts():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`,
      `&category=${this.selectedCategory ?? ''}`,
      `&status=${this.selectedStatus ?? ''}`,
      `&brand=${this.selectedBrand ?? ''}`,
    ].join('');

    this._crudSvc.getRequest(`/inventory/products/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        
        this.productsList = data.data;
        this.totalItems = data.total;
      })
  }
  
  public onFilterChange(event: CategoryModel[] | StatusModel[] | any){
    if(event.type == 'category'){ this.selectedCategory = event.data}
    if(event.type == 'status'){ this.selectedStatus = event.data}
    if(event.type == 'brand'){ this.selectedBrand = event.data}

    this.getProducts()
  }
  
  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getProducts()
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getProducts();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getProducts();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getProducts();
    });

    this.listSubscribers = [observer1$];
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 16);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }

  private validateOrderColumnTable(){
    if(this.isModal){
      this.orderColumn = [
        {
          title: 'ID',
          compare: (a: ProductModel, b: ProductModel) => a.id - b.id,
          priority: false
        },
        {
          title: 'Imagen',
        },
        {
          title: 'Referencia',
        },
        {
          title: 'Nombre',
        },
        {
          title: 'Precio Venta',
        },
        {
          title: 'Stock'
        },
        {
          title: 'Estado'
        },
        {
          title: ''
        }
      ]
    }
  }
   // ---------------------------------------------------------------------
  // ------------------------MODALS-----------------------
  // ---------------------------------------------------------------------

  public openModalImport(tplFooter: TemplateRef<{}>){
    
    this.modalService.create({
      nzTitle: 'Importar Datos',
      nzContent: ModalImportComponent,
      nzClosable: true,
      nzFooter: tplFooter
    });
  }
}