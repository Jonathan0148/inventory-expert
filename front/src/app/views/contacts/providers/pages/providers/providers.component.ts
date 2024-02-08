import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProviderModel } from 'src/app/shared/interfaces/provider';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';

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
        title: 'Nombre',
      },
      {
        title: 'NIT',
      },
      {
        title: 'Teléfono fijo',
      },
      {
        title: 'Correo Electrónico',
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
  
  constructor( 
    private _crudSvc:CrudServices
    ){}

  ngOnInit(): void {
    this.getProviders();
    this.listenObserver();
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

    this._crudSvc.getRequest(`/providers/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
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
}
