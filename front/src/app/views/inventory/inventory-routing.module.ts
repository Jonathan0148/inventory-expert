import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../../shared/guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'productos',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Productos'
    },
    loadChildren: () => import('../../views/inventory/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'marcas',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Marcas'
    },
    loadChildren: () => import('../../views/inventory/brands/brands.module').then(m => m.BrandsModule),
  },
  {
    path: 'local',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Local'
    },
    loadChildren: () => import('../../views/inventory/locals/locals.module').then(m => m.LocalsModule),
  },
  {
    path: 'categorias',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Categorías'
    },
    loadChildren: () => import('../../views/inventory/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'bajas',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Bajas'
    },
    loadChildren: () => import('../../views/inventory/losses/losses.module').then(m => m.LossesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
