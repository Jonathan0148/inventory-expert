import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServices } from '../../../../../shared/services/crud.service';
import { LocalModel } from '../../../../../shared/interfaces/local';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-locals',
  templateUrl: './add-locals.component.html',
  styleUrls: ['./add-locals.component.scss']
})
export class AddLocalsComponent implements OnInit {
  id: number;
  section: LocalModel[];
  isDetail: boolean = false;
  hasAdminModule: boolean = false;
  modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 

  constructor( 
    private activatedRoute: ActivatedRoute,
    private _crudSvc:CrudServices,
    private router: Router,
    private cookieSvc: CookieService
    ) {  
      this.activatedRoute.params.subscribe((params) => {
        this.id = params.id ?? '';
        this.isDetail = !!this.router.url
          .split("/")
          .find((a) => a === 'detalle');
      });
    if(this.id) this.getSection()
  }

  ngOnInit(): void {
    this.setHasAdmin();
  }

  //------------------------------------------------------------------------
  //-------------------------------GET DATA---------------------------------
  //------------------------------------------------------------------------
  public getSection(){
    this._crudSvc.getRequest(`/inventory/distribution-local/shelves/show/${this.id}`).subscribe((res: any) => {
      const { data } = res;
      this.section = data;
    })
  }

  private setHasAdmin(){
    const hasAdminModule = this.modules.find((module) => module.code === 13);
    if (hasAdminModule.has_admin) this.hasAdminModule = true;
  }

  public editForm(section:LocalModel[]):void{
    this.section = section;
  }
}
