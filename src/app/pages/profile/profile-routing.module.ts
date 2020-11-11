import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ProfilePageResolver } from './profile.page.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: { data: ProfilePageResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule { }
