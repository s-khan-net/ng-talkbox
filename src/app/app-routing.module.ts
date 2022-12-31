import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './features/bot/components/details/details.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { HomepageComponent } from './features/home/components/homepage/homepage.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { NavBarComponent } from './features/nav-bar/components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuardService as AuthGuard } from './core/services/authentication/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: HomepageComponent
  },
  {
    path: '', component: NavBarComponent, outlet: 'navbar'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'bot/:id', component: DetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
