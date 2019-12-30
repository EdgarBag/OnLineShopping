import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { SignupComponent } from './components/signup/signup.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home/payment", component: PaymentPageComponent, canActivate: [AuthGuard] },
  { path: "signup", component: SignupComponent },
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
