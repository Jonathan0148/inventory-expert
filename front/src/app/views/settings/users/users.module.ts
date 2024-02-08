import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { AppsService } from '../../../shared/services/apps.service';
import { TableService } from '../../../shared/services/table.service';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { FormPasswordComponent } from './components/form-password/form-password.component';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components.module';
registerLocaleData(es);




@NgModule({
  declarations: [
    UsersComponent,
    AddUsersComponent,
    ListUsersComponent,
    FormUsersComponent,
    FormPasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule { }