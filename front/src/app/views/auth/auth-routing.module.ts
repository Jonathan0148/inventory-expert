import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    component: LoginComponent,
    data: {
        title: 'Iniciar sesión'
    },
  },
  {
    path: 'recuperar-contrasena',
    component: LoginComponent,
    data: {
        title: 'Recuperar Contraseña'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
