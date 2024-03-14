import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]  },
  { path: 'profil', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'admin/user-management', component: UserManagementComponent, canActivate: [AdminGuard] },
  { 
    path: 'admin/user-edit/:id', 
    component: UserEditComponent, 
    canActivate: [AdminGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
