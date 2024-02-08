import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../../shared/guards/no-auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'clientes',
    pathMatch:'full'
  },
  {
    path: 'clientes',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Clientes'
    },
    loadChildren: () => import('../../views/contacts/customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'proveedores',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Proveedores'
    },
    loadChildren: () => import('../../views/contacts/providers/providers.module').then(m => m.ProvidersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
