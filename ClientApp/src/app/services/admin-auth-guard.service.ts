import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth: AuthService) { 
  }

  canActivate(): Observable<boolean> {    
    return this.auth.roles$.pipe(map(roles =>
    {
      if (roles && roles.indexOf("Admin") > -1) {
        return true;
      }
      else if (this.auth.loggedIn) {
        window.location.href = "/";
        return false;
      }
      else {
        this.auth.login(window.location.pathname);
        return false;
      }
    }));
  }
}
