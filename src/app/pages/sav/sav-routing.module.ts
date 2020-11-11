import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavPage } from './sav.page';
import { SavPageResolver } from './sav.page.resolver';

const routes: Routes = [
  {
    path: '',
    component: SavPage,
    resolve: {
      data: SavPageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavPageRoutingModule {}
