import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalsRoutingModule } from './locals-routing.module';
import { LocalsComponent } from './pages/locals/locals.component';
import { AddLocalsComponent } from './pages/add-locals/add-locals.component';
import { ListLocalsComponent } from './components/list-locals/list-locals.component';
import { FormLocalsComponent } from './components/form-locals/form-locals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormRowsComponent } from './components/form-rows/form-rows.component';
import { FormColumnsComponent } from './components/form-columns/form-columns.component';
import { ListColumnsComponent } from './components/list-columns/list-columns.component';
import { ListRowsComponent } from './components/list-rows/list-rows.component';


@NgModule({
  declarations: [
    LocalsComponent,
    AddLocalsComponent,
    ListLocalsComponent,
    FormLocalsComponent,
    FormRowsComponent,
    FormColumnsComponent,
    ListColumnsComponent,
    ListRowsComponent
  ],
  imports: [
    CommonModule,
    LocalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    ComponentsModule
  ]
})
export class LocalsModule { }
