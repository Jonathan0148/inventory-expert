import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCategoriesComponent } from './pages/add-categories/add-categories.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { FormCategoriesComponent } from './components/form-categories/form-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { AppsService } from '../../../shared/services/apps.service';
import { TableService } from '../../../shared/services/table.service';
import { ComponentsModule } from 'src/app/shared/components.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategoriesComponent,
    ListCategoriesComponent,
    FormCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
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
export class CategoriesModule { }
