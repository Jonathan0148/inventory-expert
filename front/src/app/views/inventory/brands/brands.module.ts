import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandComponent } from './pages/brand/brand.component';
import { AddBrandComponent } from './pages/add-brand/add-brand.component';
import { FormBrandComponent } from './components/form-brand/form-brand.component';
import { ListBrandComponent } from './components/list-brand/list-brand.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { AppsService } from '../../../shared/services/apps.service';
import { TableService } from '../../../shared/services/table.service';
import { ComponentsModule } from 'src/app/shared/components.module';


@NgModule({
  declarations: [
    BrandComponent,
    AddBrandComponent,
    FormBrandComponent,
    ListBrandComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
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
export class BrandsModule { }
