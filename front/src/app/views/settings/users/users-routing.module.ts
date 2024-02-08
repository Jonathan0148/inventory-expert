import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'crear',
    component: AddUsersComponent,
    data: {
      title: 'Crear'
    }
  },
  {
    path: 'editar/:id',
    component: AddUsersComponent,
    data: {
      title: 'Editar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
