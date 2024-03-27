import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LossesRoutingModule } from './losses-routing.module';
import { FormLosseComponent } from './components/form-losse/form-losse.component';
import { ListLosseComponent } from './components/list-losse/list-losse.component';
import { AddLosseComponent } from './pages/add-losse/add-losse.component';
import { LosseComponent } from './pages/losse/losse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components.module';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { AppsService } from 'src/app/shared/services/apps.service';
import { TableService } from 'src/app/shared/services/table.service';


@NgModule({
  declarations: [
    FormLosseComponent,
    ListLosseComponent,
    AddLosseComponent,
    LosseComponent
  ],
  imports: [
    CommonModule,
    LossesRoutingModule,
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
export class LossesModule { }
