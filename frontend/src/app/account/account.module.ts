import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import {HttpClientModule} from '@angular/common/http';
import {RegisterService} from './register/register.service';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    FlexModule
  ],
  providers: [
    LoginService,
    RegisterService
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AccountModule { }
