import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../enums/user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.endpoint;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.apiUrl}/users`);
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/1`);
  }
}
