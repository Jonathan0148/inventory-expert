import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AddExpensesComponent } from './pages/add-expenses/add-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent,
  },
  {
    path: 'crear',
    component: AddExpensesComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddExpensesComponent,
    data: {
      title: 'Editar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
