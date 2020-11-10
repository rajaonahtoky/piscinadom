import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginIntroPageRoutingModule } from './login-intro-routing.module';

import { LoginIntroPage } from './login-intro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginIntroPageRoutingModule
  ],
  declarations: [LoginIntroPage]
})
export class LoginIntroPageModule {}
