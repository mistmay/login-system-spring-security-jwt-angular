import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:8080/api";
  uriAuth: string = "/auth";
  urlAuth: string = this.url + this.uriAuth;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.urlAuth}/login`, user);
  }

  register(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.urlAuth}/register`, user);
  }

  isTokenExpired(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlAuth}/istokenexpired/${token}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/user`);
  }

}
