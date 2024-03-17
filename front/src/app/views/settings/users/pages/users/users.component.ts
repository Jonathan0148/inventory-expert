import { Component, OnInit } from '@angular/core';
import { TableService } from '../../../../../shared/services/table.service';
import { UserModel } from '../../../../../shared/interfaces/user';
import { CrudServices } from 'src/app/shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { StatusModel } from '../../../../../shared/interfaces/status';
import { RoleModel } from '../../../../../shared/interfaces/role';
import { StatusService } from '../../services/status.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listSubscribers: Subscription[] = [];

  loading: boolean = false;
  limit: number = 10;
  orderColumn = [
      {
          title: 'ID',
          compare: (a: UserModel, b: UserModel) => a.id - b.id,
          priority: false
      },
      {
          title: 'Avatar',
      },
      {
          title: 'Nombre',
      },
      {
          title: 'Rol',
      },
      {
          title: 'Local',
      },
      {
          title: 'Estado',
      },
      {
          title: ''
      }
  ]
  page: number = 1;
  roleList:RoleModel[] = [];
  selectedRole:RoleModel;
  selectedStatus:StatusModel;
  searchInput: any;
  statusList = this._statusSvc.get();
  term:string = '';
  totalItems:number;
  usersList:UserModel[];
  pageRole: number = 1;
  termRole: string = '';
  lastpageRole: number;
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 
  
  constructor( 
    private _crudSvc:CrudServices,
    private _statusSvc: StatusService,
    private cookieSvc: CookieService
  ){}

  ngOnInit(): void {
    this.listenObserver();
    this.getUsers();
    this.getRoles();
    this.setHasAdmin();
  }

  // ---------------------------------------------------------------------
  // ----------------------------GET DATA---------------------------------
  // ---------------------------------------------------------------------
  private getUsers():void {
    this.loading = true;

    let status = (this.selectedStatus?.value || this.selectedStatus?.value === 0) ? this.selectedStatus?.value : '';

    const query = [
      `?page=${this.page}`,
      `&term=${this.term}`,
      `&limit=${this.limit}`,
      `&role=${this.selectedRole || ''}`,
      `&status=${ status }`,
    ].join('');

    this._crudSvc.getRequest(`/settings/users/index${query}`).pipe(finalize( () => this.loading = false)).subscribe((res: any) => {
        const { data } = res;
        
        this.usersList = data.data;
        this.totalItems = data.total;
      })
  }


  public getRoles():void {
     const query = [
       `?page=${this.pageRole}`,
       `&term=${this.termRole}`
     ].join('');
     
     if(this.lastpageRole && ((this.lastpageRole < this.pageRole) && !this.termRole) ) return
 
     this._crudSvc.getRequest(`/settings/roles/index${query}`).subscribe((res: any) => {
         const { data } = res;
      
         (!this.termRole) ? this.roleList = [...this.roleList,  ...data.data] : this.roleList = data.data;
         this.lastpageRole = data.last_page;
         this.pageRole++;
     })
   }

   //------------------------------------------------------------------------
  //-------------------------------EVENTS-----------------------------------
  //------------------------------------------------------------------------
  public onSearchRole(event:string){
    if(event?.length > 3) {
      this.termRole = event;
      this.getRoles();
      this.setPage();
    }

    if(!event?.length && this.termRole) {
      this.setPage();
      this.termRole = '';
      this.roleList = []
      this.getRoles();
    }  
  }
  // ---------------------------------------------------------------------
  // ------------------------PAGINATION AND FILTERS-----------------------
  // ---------------------------------------------------------------------
  public search(): void {
      this.term = this.searchInput;
      this.getUsers()
  }

  public onChangeRole(role:RoleModel):void{
    this.selectedRole = role;
    this.getUsers();
  }

  public onChangeStatus(status:StatusModel):void{
    this.selectedStatus = status;
    this.getUsers();
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getUsers();
  }

  public pageSizeChanged(limit: number):void {
      this.limit = limit; this.page = 1;
      this.getUsers();
  }

  private setPage = ():number => this.pageRole = 1; 

  private listenObserver = () => {
    const observer1$ = this._crudSvc.requestEvent.subscribe((res) => {
      this.getUsers();
    });

    this.listSubscribers = [observer1$];
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 12);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }
  
  ngOnDestroy(): void {
    this.listSubscribers.map(a => a.unsubscribe());
  }
}