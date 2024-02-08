import { Component, OnInit } from '@angular/core';
import { ActivityList } from '../../../../shared/interfaces/activity-list';
import { ThemeConstantService } from '../../../../shared/services/theme-constant.service';
import { AuditTypes } from '../../../../shared/interfaces/audit-types';
import { CrudServices } from '../../../../shared/services/crud.service';
import { finalize } from 'rxjs/operators';
import { AuxiliarService } from '../../../../shared/services/auxiliar.service';

@Component({
  selector: 'app-cards-activity-list',
  templateUrl: './cards-activity-list.component.html',
  styleUrls: ['./cards-activity-list.component.scss']
})
export class CardsActivityListComponent implements OnInit {

  loading:boolean = false; 
  totalItems:number;
  page:number = 1;

  activityList:ActivityList[] = [];
  typeAuditList:AuditTypes[] = [
      {
          name: "Productos",
          value: "producto",
          connector: "el",
          path: "getActivityProducts",
      },
      {
          name: "Ventas",
          value: "venta",
          connector: "la",
          path: "getActivitySales",
      },
      // {
      //   name: "Usuarios",
      //   value: "user",
      //   path: "/getActivityUsers",
      // },
      {
          name: "Ordenes",
          value: "orden",
          connector: "la",
          path: "getActivityOrders",
      },
  ];   
  selectedTypeAudit:AuditTypes = this.typeAuditList[0]; 

  constructor(
    private _crudSvc:CrudServices,
    private _auxSvc:AuxiliarService
  ) { }

  ngOnInit(): void {
    this.getAudit()
  }

  getAudit(path:string = 'getActivityProducts'){
    this.loading = true;

    const query = { page: this.page };

    this._crudSvc.postRequest(`/dashboard/${path}`, query)
    .pipe(finalize( () => this.loading = false))
    .subscribe((res: any) => {
        const { data } = res;
        
        this.getColorForUser(data.data);
        this.totalItems = data.total;
    })

  }

  private getColorForUser(data:any):any {
    data.forEach(e => { e.avatar = this._auxSvc.colorList[this._auxSvc.getRandomNumber()] })
    this.activityList = data;
 }

  // ---------------------------------
  // -------------EVENTS--------------
  // ---------------------------------
  public onChangeTypeActivity(event:AuditTypes):void {
    this.page = 1;
    this.activityList = [];
    this.getAudit(event?.path)
  }

  public pageIndexChanged(page:number):void {
    this.page = page; 
    this.getAudit(this.selectedTypeAudit?.path);
  }

}
