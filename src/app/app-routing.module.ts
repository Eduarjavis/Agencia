import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './componetes/inventario/inventario.component';
import { LoginComponent } from './componetes/login/login.component';
import { RegistroComponent } from './componetes/registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistroComponent},
  { path: 'inventario', component: InventarioComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
