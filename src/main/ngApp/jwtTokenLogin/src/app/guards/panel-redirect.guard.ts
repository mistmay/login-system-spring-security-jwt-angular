import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelRedirectGuard implements CanLoad {
  constructor(private auth: LoginService, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(map((res: boolean) => {
      if (!res) {
        return true;
      } else {
        this.router.navigate(['panel']);
        return false;
      }
    }));
  }

}
