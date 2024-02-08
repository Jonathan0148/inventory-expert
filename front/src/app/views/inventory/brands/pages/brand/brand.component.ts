import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { BrandModel } from '../../../../../shared/interfaces/brand';
import { Subscription } from 'rxjs';

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
  brandsList:BrandModel[];
  searchInput: any;
  term: string = '';
  totalItems:number;
  
  constructor(
    private _crudSvc:CrudServices 
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getBrands();
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

    this._crudSvc.getRequest(`/brands/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
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
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
  

}
