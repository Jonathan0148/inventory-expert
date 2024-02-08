import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AddInvoicesComponent } from './pages/add-invoices/add-invoices.component';
import { ListInvoicesComponent } from './components/list-invoices/list-invoices.component';
import { FormInvoicesComponent } from './components/form-invoices/form-invoices.component';
import { ComponentsModule } from 'src/app/shared/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsModule } from '../../inventory/products/products.module';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { AppsService } from '../../../shared/services/apps.service';
import { TableService } from '../../../shared/services/table.service';
import { FilterComponent } from './components/filter/filter.component';
import { DetailPaymentComponent } from './components/detail-payment/detail-payment.component';
import { ObservationsOrderComponent } from './components/observations-order/observations-order.component';
import { InfoProvidersOrderComponent } from './components/info-providers-order/info-providers-order.component';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { AddBailsComponent } from './pages/add-bails/add-bails.component';
import { ViewBailsComponent } from './pages/view-bails/view-bails.component';
import { FormBailsComponent } from './components/form-bails/form-bails.component';
import { ListBailsComponent } from './components/list-bails/list-bails.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "rigth",
  allowNegative: false,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    InvoicesComponent,
    AddInvoicesComponent,
    ListInvoicesComponent,
    FormInvoicesComponent,
    FilterComponent,
    DetailPaymentComponent,
    ObservationsOrderComponent,
    InfoProvidersOrderComponent,
    AddBailsComponent,
    ViewBailsComponent,
    FormBailsComponent,
    ListBailsComponent,
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
    ProductsModule
  ],
  providers: [
    ThemeConstantService,
    AppsService,
    TableService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class InvoicesModule { }
