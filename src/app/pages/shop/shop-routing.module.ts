import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';
import { ShopPageResolver } from './shop.page.resolver';

const routes: Routes = [
  {
    path: '',
    component: ShopPage,
    resolve: { shops: ShopPageResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule { }
