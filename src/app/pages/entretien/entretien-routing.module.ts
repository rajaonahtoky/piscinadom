import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntretienPage } from './entretien.page';
import { EntretiensPageResolver } from './entretien.page.resolver';

const routes: Routes = [
  {
    path: '',
    component: EntretienPage,
    resolve: { entretiens: EntretiensPageResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntretienPageRoutingModule { }
