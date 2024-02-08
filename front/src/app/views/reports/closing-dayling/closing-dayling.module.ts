import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClosingDaylingRoutingModule } from './closing-dayling-routing.module';
import { ClosingDaylingComponent } from './pages/closing-dayling/closing-dayling.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../shared/components.module';
import { DetailSalesComponent } from './components/detail-sales/detail-sales.component';
import { DetailBailsComponent } from './components/detail-bails/detail-bails.component';
import { DetailExpensesComponent } from './components/detail-expenses/detail-expenses.component';
import { DetailBalanceComponent } from './components/detail-balance/detail-balance.component';
import { DetailInvoicesComponent } from './components/detail-invoices/detail-invoices.component';
import { DetailBailsInvoiceComponent } from './components/detail-bails-invoice/detail-bails-invoice.component';

@NgModule({
  declarations: [
    ClosingDaylingComponent,
    DetailSalesComponent,
    DetailBailsComponent,
    DetailExpensesComponent,
    DetailBalanceComponent,
    DetailInvoicesComponent,
    DetailBailsInvoiceComponent
  ],
  imports: [
    CommonModule,
    ClosingDaylingRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
  ]
})
export class ClosingDaylingModule { }
