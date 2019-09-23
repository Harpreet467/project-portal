import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import {FlexModule} from '@angular/flex-layout';
import {accountRoute} from './account.route';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(accountRoute),
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    FlexModule
  ],
  providers: [
    LoginService
  ]
})
export class AccountModule { }
