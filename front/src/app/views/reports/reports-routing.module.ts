import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cierre-diario',
    loadChildren: () => import('../../views/reports/closing-dayling/closing-dayling.module').then(m => m.ClosingDaylingModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
