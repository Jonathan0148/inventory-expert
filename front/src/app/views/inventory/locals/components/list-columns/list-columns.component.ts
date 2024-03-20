import { Component, Input, OnInit } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { LocalModel } from '../../../../../shared/interfaces/local';
import { Subscription } from 'rxjs';
import { ColumnsService } from '../../services/columns.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-columns',
  templateUrl: './list-columns.component.html',
  styleUrls: ['./list-columns.component.scss']
})
export class ListColumnsComponent implements OnInit {
  @Input () id:number;

  listSubscribers: Subscription[] = [];
  columnsLists:any[];
  displayData:any;
  loading: boolean = false;
  orderColumn = [
    {
          title: 'ID',
          compare: (a: LocalModel, b: LocalModel) => a.id - b.id,
      },
      {
          title: 'Nombre',
      },
      {
          title: ''
      }
  ]
  page: number = 1;
  totalItems:number;
  limit:number;
  isDetail: boolean = false;
  @Input() hasAdminModule:boolean;

  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
    private _columnSvc:ColumnsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ?? '';
      this.isDetail = !!this.router.url
        .split("/")
        .find((a) => a === 'detalle');
    });
  }

  ngOnInit(): void {
    this.listenObserver();
    this.getColumns();
    
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {
    this._crudSvc.deleteRequest(`/inventory/distribution-local/columns/destroy/${id}`)
    .subscribe(res => {
      this._crudSvc.requestEvent.emit('deleted')
    })
  }

  beforeConfirm(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  
  public onClickEditColumn(column:LocalModel):void {
    this._columnSvc.setColumn$(column);
  }

  
  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getColumns(){
    this.loading = true;

    const body = {
      shelf_id: this.id,
      page:this.page,
      limit:this.limit,
    };

    this._crudSvc.postRequest(`/inventory/distribution-local/columns/index`, body).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
      const { data } = res; 
      this.columnsLists = data.data;
      this.totalItems = data.total;
    })
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getColumns();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getColumns();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getColumns();
    });

    const observer2$ = this._columnSvc.columnLists$.subscribe((res) => {
      this.getColumns();
    });

    this.listSubscribers = [observer1$, observer2$];
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}
