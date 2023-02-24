import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { ToastContainerModule } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastMessageService } from './core/service/toast-message/toast-message.service';
import { InputWalletsComponent } from './wallet/input-wallets/input-wallets.component';
import { ToastrService } from 'ngx-toastr';
import { BalanceTableComponent } from './balance/component/balance-table/balance-table.component';
import { BalanceService } from './balance/service/balance.service';
import { ErrorHandlerService } from './balance/service/error-handler.service';
import { NavbarComponent } from './core/component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InputWalletsComponent,
    BalanceTableComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [ToastMessageService, ToastrService, BalanceService, ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }