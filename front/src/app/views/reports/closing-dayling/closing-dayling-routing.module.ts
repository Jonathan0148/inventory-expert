import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClosingDaylingComponent } from './pages/closing-dayling/closing-dayling.component';

const routes: Routes = [
  {
    path:'',
    component: ClosingDaylingComponent,
    data: {
      title: 'Cierres'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosingDaylingRoutingModule { }
