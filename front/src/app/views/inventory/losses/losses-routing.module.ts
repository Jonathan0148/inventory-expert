import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LosseComponent } from './pages/losse/losse.component';
import { AddLosseComponent } from './pages/add-losse/add-losse.component';

const routes: Routes = [
  {
    path: '',
    component: LosseComponent,
  },
  {
    path: 'crear',
    component: AddLosseComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddLosseComponent,
    data: {
      title: 'Editar'
    }
  },
  {
    path: 'detalle/:id',
    component: AddLosseComponent,
    data: {
      title: 'Detalle'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LossesRoutingModule { }
