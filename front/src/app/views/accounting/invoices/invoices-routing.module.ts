import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoicesComponent } from './pages/add-invoices/add-invoices.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { ViewBailsComponent } from './pages/view-bails/view-bails.component';
import { AddBailsComponent } from './pages/add-bails/add-bails.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
  },
  {
    path: 'crear',
    component: AddInvoicesComponent,
    data: {
      title: 'Crear',
    }
  },
  {
    path: 'editar/:id',
    component: AddInvoicesComponent,
    data: {
      title: 'Editar',
    }
  },
  {
    path: 'abonos/:id',
    data: {
      title: 'Abonos'
    },
    children:[
      {
        path:'',
        component: ViewBailsComponent,
      },
      {
        path: 'crear',
        component: AddBailsComponent,
        data: {
          title: 'Crear'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
