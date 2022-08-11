import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Message } from '../model/message';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: ApiService, private router: Router) { }

  login(user: User): void {
    this.api.login(user)
      .subscribe((res: Message) => {
        const token: string = "Bearer " + res.message;
        console.log(token);
        sessionStorage.setItem("token", token);
        this.router.navigate(['panel']);
      });
  }

  isLoggedIn(): Observable<boolean> {
    const token: string | null = sessionStorage.getItem("token");
    if (token !== null) {
      return this.api.isTokenExpired(token);
    } else {
      return new BehaviorSubject<boolean>(false);
    }
  }

  logOut() {
    sessionStorage.removeItem("token");
  }

}
