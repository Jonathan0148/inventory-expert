import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BailModel } from '../../../../../shared/interfaces/bail';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { StatusService } from '../../../sales/services/status.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

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
    private _statusSvc: StatusService,    
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
      order: this.id,
    }

    this._crudSvc.postRequest(`/bails_order/index`, body).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data, dataTwo } = res;
        
        this.totalBails = dataTwo;
        this.total =  data.data[0]?.order.total;
        this.reference =  data.data[0]?.order.reference;
        this.bailsList = data.data;
        this.totalItems = data.total;
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
