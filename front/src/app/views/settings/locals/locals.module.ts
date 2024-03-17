import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalsRoutingModule } from './locals-routing.module';
import { FormLocalsComponent } from './components/form-locals/form-locals.component';
import { ListLocalsComponent } from './components/list-locals/list-locals.component';
import { AddLocalsComponent } from './pages/add-locals/add-locals.component';
import { LocalsComponent } from './pages/locals/locals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/shared/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { AppsService } from 'src/app/shared/services/apps.service';
import { TableService } from 'src/app/shared/services/table.service';


@NgModule({
  declarations: [
    FormLocalsComponent,
    ListLocalsComponent,
    AddLocalsComponent,
    LocalsComponent
  ],
  imports: [
    CommonModule,
    LocalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
export class LocalsModule { }
