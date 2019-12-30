import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { Page404Component } from './components/page404/page404.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { Reducer } from './redux/reducer';
import { AppState } from './redux/appState';
import { AdminCartComponent } from './components/admin-cart/admin-cart.component';
import { UsersService } from './services/users.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    Page404Component,
    SignupComponent,
    CartComponent,
    PaymentPageComponent,
    AdminCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgReduxModule

  ],
  providers: [UsersService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(ngRedux: NgRedux<AppModule>) {
    ngRedux.configureStore(Reducer.reduce, new AppState)
  }
}
