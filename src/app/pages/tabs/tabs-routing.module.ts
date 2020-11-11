import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'entretien',
        loadChildren: () => import('../entretien/entretien.module').then( m => m.EntretienPageModule)
      },
      {
        path: 'sav',
        loadChildren: () => import('../sav/sav.module').then( m => m.SavPageModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('../shop/shop.module').then( m => m.ShopPageModule)
      }
    ],
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
