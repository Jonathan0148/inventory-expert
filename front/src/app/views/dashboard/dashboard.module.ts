import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CardsInfoReportsComponent } from './components/cards-info-reports/cards-info-reports.component';
import { CardsTopProductsComponent } from './components/cards-top-products/cards-top-products.component';
import { CardsTopClientsComponent } from './components/cards-top-clients/cards-top-clients.component';
import { CardsRecentSalesComponent } from './components/cards-recent-sales/cards-recent-sales.component';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/shared/components.module';
import { CardRevenuesComponent } from './components/card-revenues/card-revenues.component';
import { CardInfoInvoicesComponent } from './components/card-info-invoices/card-info-invoices.component';
import { CardInfoClientsDebtorsComponent } from './components/card-info-clients-debtors/card-info-clients-debtors.component';
import { ListSalesClientsComponent } from './components/list-sales-clients/list-sales-clients.component';
import { CardsActivityListComponent } from './components/cards-activity-list/cards-activity-list.component';
import { InfoTypeActivityComponent } from './components/info-type-activity/info-type-activity.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardsInfoReportsComponent,
    CardsTopProductsComponent,
    CardsTopClientsComponent,
    CardsRecentSalesComponent,
    CardRevenuesComponent,
    CardInfoInvoicesComponent,
    CardInfoClientsDebtorsComponent,
    ListSalesClientsComponent,
    CardsActivityListComponent,
    InfoTypeActivityComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    TranslateModule,
    ChartsModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
