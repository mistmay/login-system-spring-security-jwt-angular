import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private auth: LoginService, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(map((res: boolean) => {
      if (res) {
        return true;
      } else {
        alert('You are not logged in');
        this.router.navigate(['home']);
        return false;
      }
    }));
  }

}
