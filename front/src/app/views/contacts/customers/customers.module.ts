import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './pages/customers/customers.component';
import { AddCustomersComponent } from './pages/add-customers/add-customers.component';
import { FormCustomersComponent } from './components/form-customers/form-customers.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components.module';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { AppsService } from 'src/app/shared/services/apps.service';
import { TableService } from 'src/app/shared/services/table.service';


@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomersComponent,
    ListCustomersComponent,
    FormCustomersComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
    ComponentsModule
  ],
  providers: [
      ThemeConstantService,
      AppsService,
      TableService
  ]
})
export class CustomersModule { }
