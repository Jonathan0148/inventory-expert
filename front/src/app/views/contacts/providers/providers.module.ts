import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { FormProvidersComponent } from './components/form-providers/form-providers.component';
import { ListProvidersComponent } from './components/list-providers/list-providers.component';
import { AddProvidersComponent } from './pages/add-providers/add-providers.component';
import { ProvidersComponent } from './pages/providers/providers.component';
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
    FormProvidersComponent,
    ListProvidersComponent,
    AddProvidersComponent,
    ProvidersComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
  providers: [
      ThemeConstantService,
      AppsService,
      TableService
  ]
})
export class ProvidersModule { }
