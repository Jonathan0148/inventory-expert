import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRolesComponent } from './pages/add-roles/add-roles.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/shared/components.module';
import { ListRolesComponent } from './components/list-roles/list-roles.component';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { AppsService } from '../../../shared/services/apps.service';
import { TableService } from '../../../shared/services/table.service';
import { FormRolesComponent } from './components/form-roles/form-roles.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolesComponent,
    AddRolesComponent,
    ListRolesComponent,
    FormRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
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
export class RolesModule { }
