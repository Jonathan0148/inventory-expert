import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  listSubscribers: Subscription[] = [];
  limit: number = 10;
  loading: boolean = false;
  orderColumn = [
    {
          title: 'ID',
          compare: (a: RoleModel, b: RoleModel) => a.id - b.id,
      },
      {
          title: 'Nombre',
      },
      {
          title: 'Descripción',
      },
      {
          title: ''
      }
  ]
  page: number = 1;
  rolesList:RoleModel[];
  searchInput: any;
  term: string = '';
  totalItems:number;
  
  constructor(
    private _crudSvc:CrudServices 
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getRoles();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------
  private getRoles():void {
    this.loading = true;

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`
    ].join('');

    this._crudSvc.getRequest(`/roles/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;

        this.rolesList = data.data;
        this.totalItems = data.total;
      })
  }

  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------
  public search(): void {
      this.term = this.searchInput;
      this.getRoles()
  }
  
  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getRoles();
  }
  
  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getRoles();
  }


  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getRoles();
    });

    this.listSubscribers = [observer1$];
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
  

}
