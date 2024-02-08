import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { AddSubcategoriesComponent } from './pages/add-subcategories/add-subcategories.component';

const routes: Routes = [
  {
    path: '',
    component: SubcategoriesComponent,
  },
  {
    path: 'crear',
    component: AddSubcategoriesComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddSubcategoriesComponent,
    data: {
      title: 'Editar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriesRoutingModule { }
