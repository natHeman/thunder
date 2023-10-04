import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { Role } from './models/role';
const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'registration', component:RegistrationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
},
  { path: 'home', component:DashboardComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
