import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../../shared/guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'ventas',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Ventas'
    },
    loadChildren: () => import('../../views/accounting/sales/sales.module').then(m => m.SalesModule),
  },
  {
    path: 'gastos',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Gastos'
    },
    loadChildren: () => import('../../views/accounting/expenses/expenses.module').then(m => m.ExpensesModule),
  },
  {
    path: 'ordenes',
    canActivate: [ NoAuthGuard ],
    data: {
        title: 'Facturas'
    },
    loadChildren: () => import('../../views/accounting/invoices/invoices.module').then(m => m.InvoicesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
