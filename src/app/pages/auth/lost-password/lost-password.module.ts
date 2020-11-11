import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostPasswordPageRoutingModule } from './lost-password-routing.module';

import { LostPasswordPage } from './lost-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LostPasswordPageRoutingModule
  ],
  declarations: [LostPasswordPage]
})
export class LostPasswordPageModule {}
