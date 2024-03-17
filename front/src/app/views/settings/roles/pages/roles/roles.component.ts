import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 
  
  constructor(
    private _crudSvc:CrudServices,
    private cookieSvc: CookieService
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getRoles();
    this.setHasAdmin();
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

    this._crudSvc.getRequest(`/settings/roles/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
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

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 11);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}