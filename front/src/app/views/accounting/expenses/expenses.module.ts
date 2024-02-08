import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AddExpensesComponent } from './pages/add-expenses/add-expenses.component';
import { FormExpensesComponent } from './components/form-expenses/form-expenses.component';
import { ListExpensesComponent } from './components/list-expenses/list-expenses.component';
import { TableService } from '../../../shared/services/table.service';
import { AppsService } from '../../../shared/services/apps.service';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components.module';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    ExpensesComponent,
    AddExpensesComponent,
    FormExpensesComponent,
    ListExpensesComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule
  ],
  providers: [
    ThemeConstantService,
    AppsService,
    TableService
  ]
})
export class ExpensesModule { }
