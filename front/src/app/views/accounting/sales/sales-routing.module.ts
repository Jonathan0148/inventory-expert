import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesComponent } from './pages/add-sales/add-sales.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ViewBailsComponent } from './pages/view-bails/view-bails.component';
import { AddBailsComponent } from './pages/add-bails/add-bails.component';
import { FormExitGuard } from 'src/app/shared/guards/form-exit.guard';
import { FormSalesComponent } from './components/form-sales/form-sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
  },
  {
    path: 'crear',
    component: AddSalesComponent,
    children: [
      {
        path: '',
        component: FormSalesComponent,
        canDeactivate: [FormExitGuard],
      },
    ],
    data: {
      title: 'Crear',
      headerDisplay: 'none',
    },
  },
  {
    path: 'editar/:id',
    component: AddSalesComponent,
    children: [
      {
        path: '',
        component: FormSalesComponent,
        canDeactivate: [FormExitGuard],
      },
    ],
    data: {
      title: 'Editar',
      headerDisplay: 'none',
    },
  },
  {
    path: 'abonos/:id',
    data: {
      title: 'Abonos',
    },
    children: [
      {
        path: '',
        component: ViewBailsComponent,
      },
      {
        path: 'crear',
        component: AddBailsComponent,
        data: {
          title: 'Crear',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
