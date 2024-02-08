import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalModel } from '../../../../../shared/interfaces/local';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RowsService } from '../../services/rows.service';

@Component({
  selector: 'app-list-rows',
  templateUrl: './list-rows.component.html',
  styleUrls: ['./list-rows.component.scss']
})
export class ListRowsComponent implements OnInit, OnDestroy {
  @Input () id:number;
  listSubscribers: Subscription[] = [];
  rowsLists:any[];
  displayData:any;
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
  totalItems:number;
  limit: number = 10;
  
  constructor(
    private nzMessageService: NzMessageService,
    private _crudSvc:CrudServices,
    private _rowSvc:RowsService
  ) {}

  ngOnInit(): void {
    this.listenObserver();
    this.getRows()
  }

  cancel(): void {
    this.nzMessageService.info('Operacion cancelada');
  }

  confirm(id:number): void {
    this._crudSvc.deleteRequest(`/local/rows/destroy/${id}`)
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

  public onClickEditRow(row:LocalModel):void {
    this._rowSvc.setRow$(row);
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getRows(){
    this.loading = true;

    const body = {
      sectionId: this.id,
      page:this.page,
      limit:this.limit,
    };
    
    this._crudSvc.postRequest(`/local/rows/index`, body).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
      const { data } = res;      
      this.rowsLists = data.data;
      this.totalItems = data.total;
    })
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getRows();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getRows();
  }

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getRows();
    });

    const observer2$ = this._rowSvc.rowLists$.subscribe((res) => {
      this.getRows();
    });

    this.listSubscribers = [observer1$, observer2$];
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}
