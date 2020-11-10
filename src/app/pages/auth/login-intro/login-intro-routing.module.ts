import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginIntroPage } from './login-intro.page';

const routes: Routes = [
  {
    path: '',
    component: LoginIntroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginIntroPageRoutingModule {}
