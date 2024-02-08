import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { AddSubcategoriesComponent } from './pages/add-subcategories/add-subcategories.component';
import { TableService } from '../../../shared/services/table.service';
import { AppsService } from '../../../shared/services/apps.service';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components.module';
import { ListSubcategoriesComponent } from './components/list-subcategories/list-subcategories.component';
import { FormSubcategoriesComponent } from './components/form-subcategories/form-subcategories.component';


@NgModule({
  declarations: [
    SubcategoriesComponent,
    AddSubcategoriesComponent,
    ListSubcategoriesComponent,
    FormSubcategoriesComponent
  ],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
  ],
  providers: [
    ThemeConstantService,
    AppsService,
    TableService 
  ]
})
export class SubcategoriesModule { }
