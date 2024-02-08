import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProvidersComponent } from './pages/add-providers/add-providers.component';
import { ProvidersComponent } from './pages/providers/providers.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
  },
  {
    path: 'crear',
    component: AddProvidersComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddProvidersComponent,
    data: {
      title: 'Editar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
