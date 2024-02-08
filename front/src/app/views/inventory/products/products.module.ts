import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableService } from '../../../shared/services/table.service';
import { AppsService } from '../../../shared/services/apps.service';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import es from '@angular/common/locales/es';
import { ComponentsModule } from 'src/app/shared/components.module';
import { FormProductsComponent } from './components/form-products/form-products.component';
import { DetailProductsComponent } from './components/detail-products/detail-products.component';
import { InfoOptionalTabComponent } from './components/info-optional-tab/info-optional-tab.component';
import { DescriptionProductTabComponent } from './components/description-product-tab/description-product-tab.component';
import { ImagesProductTabComponent } from './components/images-product-tab/images-product-tab.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { FieldsCategoriesComponent } from './components/fields-categories/fields-categories.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask';
import { ModalImportComponent } from './components/modal-import/modal-import.component';
import { ModalListProductsNoImportsComponent } from './components/modal-list-products-no-imports/modal-list-products-no-imports.component';
registerLocaleData(es);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  exports:[
    ProductsComponent
  ],
  declarations: [
    ProductsComponent,
    AddProductsComponent,
    ListProductsComponent,
    FormProductsComponent,
    DetailProductsComponent,
    InfoOptionalTabComponent,
    DescriptionProductTabComponent,
    ImagesProductTabComponent,
    EditProductComponent,
    FieldsCategoriesComponent,
    FiltersComponent,
    ModalImportComponent,
    ModalListProductsNoImportsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(), 
    TranslateModule,
    SharedModule,
    NgxBarcodeModule
  ],
  providers: [
    ThemeConstantService,
    AppsService,
    TableService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class ProductsModule { }
