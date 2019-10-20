import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(map(res => {
      if (!res) {
        this.auth.login();
      }

      return res;
    }));
  }

  constructor(protected auth: AuthService) { }
}
