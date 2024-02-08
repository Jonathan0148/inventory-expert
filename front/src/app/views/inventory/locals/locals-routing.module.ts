import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLocalsComponent } from './pages/add-locals/add-locals.component';
import { LocalsComponent } from './pages/locals/locals.component';

const routes: Routes = [
  {
    path: '',
    component: LocalsComponent,
  },
  {
    path: 'crear',
    component: AddLocalsComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddLocalsComponent,
    data: {
      title: 'Editar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalsRoutingModule { }
