import { Component, OnInit } from '@angular/core';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { CrudServices } from '../../../../shared/services/crud.service';
// import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { CustomerModel } from '../../../../shared/interfaces/customer';

@Component({
  selector: 'app-cards-top-clients',
  templateUrl: './cards-top-clients.component.html',
  styleUrls: ['./cards-top-clients.component.scss']
})
export class CardsTopClientsComponent implements OnInit {
  
  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  gold = this.themeColors.gold;
  red = this.themeColors.red;

  customersChartLabels: string[] =  [];
  customersChartData: number[] = [];
  customers: CustomerModel[];

  customersChartColors: Array<any> =  [{ 
      backgroundColor: [this.gold, this.blue, this.red],
      pointBackgroundColor : [this.gold, this.blue, this.red]
  }];

  public totalDoughnut: number = 0;
  // Doughnut
  public doughnutChartType = 'doughnut';
  public customersChartOptions: any = {
      cutoutPercentage: 80,
      maintainAspectRatio: false
  }

  constructor(
    private colorConfig:ThemeConstantService,
    private _crudSvc:CrudServices,
  ) {}

  ngOnInit(): void {
    this.getTopClients()
  }

  public getTopClients(){
    this._crudSvc.getRequest(`/dashboard/getTopClients`).subscribe((res: any) => {
      const { data } = res;
      this.customers = data.data;
      data.data.map(client => {
        this.customersChartLabels.push(client.full_name)
        this.customersChartData.push(client.sales_count)
      })
    })
  }


  
}