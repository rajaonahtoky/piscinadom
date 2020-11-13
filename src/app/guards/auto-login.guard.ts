import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(private authService: FirebaseAuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          return true;
        }
      })
    );
  }
  
}
