import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login/intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule),
  },
  {
    path: 'login',
    children: [
      {
        path: 'intro',
        loadChildren: () => import('./pages/auth/login-intro/login-intro.module').then( m => m.LoginIntroPageModule),
        canLoad: [IntroGuard, AutoLoginGuard]
      },
      {
        path: 'email',
        loadChildren: () => import('./pages/auth/login-email/login-email.module').then( m => m.LoginEmailPageModule),
        canLoad: [IntroGuard, AutoLoginGuard]
      },
      {
        path: 'lost-password',
        loadChildren: () => import('./pages/auth/lost-password/lost-password.module').then( m => m.LostPasswordPageModule)
      },
      {
        path: 'phone-login',
        loadChildren: () => import('./pages/auth/phone-login/phone-login.module').then( m => m.PhoneLoginPageModule)
      }
    ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
