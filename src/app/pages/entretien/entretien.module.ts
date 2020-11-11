import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntretienPageRoutingModule } from './entretien-routing.module';

import { EntretienPage } from './entretien.page';
import { EntretiensPageResolver } from './entretien.page.resolver';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EntretienPageRoutingModule
  ],
  declarations: [EntretienPage],
  providers: [EntretiensPageResolver]
})
export class EntretienPageModule {}
