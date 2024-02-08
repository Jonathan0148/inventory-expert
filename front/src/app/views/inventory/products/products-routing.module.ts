import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'crear',
    component: AddProductsComponent,
    data: {
      title: 'Crear',
      headerDisplay: "none"
    }
  },
  {
    path: 'editar/:id',
    component: EditProductComponent,
    data: {
      title: 'Editar',
      headerDisplay: "none"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
