import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavPageRoutingModule } from './sav-routing.module';

import { SavPage } from './sav.page';
import { SavPageResolver } from './sav.page.resolver';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SavPageRoutingModule
  ],
  declarations: [SavPage],
  providers: [SavPageResolver]
})
export class SavPageModule {}
