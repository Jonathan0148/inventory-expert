import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { StatusService } from '../../services/status.service';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { BailModel } from '../../../../../shared/interfaces/bail';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bails',
  templateUrl: './view-bails.component.html',
  styleUrls: ['./view-bails.component.scss']
})
export class ViewBailsComponent implements OnInit {

  listSubscribers: Subscription[] = [];
  id:number;
  loading: boolean = false;
  limit: number = 10;
  orderColumn = [
    {
      title: 'ID',
      compare: (a: BailModel, b: BailModel) => a.id - b.id,
      priority: false
    },
    {
      title: 'Cantidad abonada',
    },
    {
      title: 'Metodo de pago',
    },
    {
      title: 'Fecha',
    }
  ]
  page: number = 1;
  searchInput: any;
  term: string = '';
  totalItems:number;
  bailsList:BailModel[];
  totalBails:number;
  total:number;
  reference:string;

  constructor( 
    private _crudSvc:CrudServices,   
    private activatedRoute: ActivatedRoute,
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
    });
  }

  ngOnInit(): void {
    this.listenObserver();
    this.getBails();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------

  private getBails():void {
    this.loading = true;

    const body = {
      page: this.page,
      term: this.term,
      limit: this.limit,
      sale: this.id,
    }

    this._crudSvc.postRequest(`/accounting/bails/index`, body).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        this.totalBails = data.total_bails;
        this.total =  data.sale.total;
        this.reference =  data.sale.reference;
        this.bailsList = data.bails.data;
        this.totalItems = data.bails.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------

  public search(): void {
      this.term = this.searchInput;
      this.getBails()
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getBails();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getBails();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getBails();
    });

    this.listSubscribers = [observer1$];
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}