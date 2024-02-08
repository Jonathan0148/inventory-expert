import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { LocalModel } from '../../../../../shared/interfaces/local';
import { Subscription } from 'rxjs';

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
  sectionsList:LocalModel[];
  searchInput: any;
  term: string = '';
  totalItems:number;
  
  constructor(
    private _crudSvc:CrudServices 
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getSections();
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

    this._crudSvc.getRequest(`/local/sections/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
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
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
  
}
