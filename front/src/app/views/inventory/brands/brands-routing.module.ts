import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './pages/add-brand/add-brand.component';
import { BrandComponent } from './pages/brand/brand.component';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
  },
  {
    path: 'crear',
    component: AddBrandComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddBrandComponent,
    data: {
      title: 'Editar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
