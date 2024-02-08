import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './pages/sales/sales.component';
import { AddSalesComponent } from './pages/add-sales/add-sales.component';
import { ListSalesComponent } from './components/list-sales/list-sales.component';
import { FormSalesComponent } from './components/form-sales/form-sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { AppsService } from '../../../shared/services/apps.service';
import { TableService } from '../../../shared/services/table.service';
import { ComponentsModule } from 'src/app/shared/components.module';
import { DetailPaymentComponent } from './components/detail-payment/detail-payment.component';
import { ObservationsSalesComponent } from './components/observations-sales/observations-sales.component';
import { InfoClientSalesComponent } from './components/info-client-sales/info-client-sales.component';
import { InfoProductsFormComponent } from './components/info-products-form/info-products-form.component';
import { ListProductsFormComponent } from './components/list-products-form/list-products-form.component';
import { ViewBailsComponent } from './pages/view-bails/view-bails.component';
import { ListBailsComponent } from './components/list-bails/list-bails.component';
import { AddBailsComponent } from './pages/add-bails/add-bails.component';
import { FormBailsComponent } from './components/form-bails/form-bails.component';
import { FilterComponent } from './components/filter/filter.component';
import { ModalSearchProductsComponent } from './components/modal-search-products/modal-search-products.component';
import { ProductsModule } from '../../inventory/products/products.module';
import { ModalConfirmExitComponent } from './components/modal-confirm-exit/modal-confirm-exit.component';

@NgModule({
  declarations: [
    SalesComponent,
    AddSalesComponent,
    ListSalesComponent,
    FormSalesComponent,
    DetailPaymentComponent,
    ObservationsSalesComponent,
    InfoClientSalesComponent,
    InfoProductsFormComponent,
    ListProductsFormComponent,
    ViewBailsComponent,
    ListBailsComponent,
    AddBailsComponent,
    FormBailsComponent,
    FilterComponent,
    ModalSearchProductsComponent,
    ModalConfirmExitComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
    ProductsModule
  ],
  providers: [
    ThemeConstantService,
    AppsService,
    TableService
  ]
})
export class SalesModule { }
