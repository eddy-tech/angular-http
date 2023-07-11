import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, catchError, map, of, tap} from 'rxjs';
import {User} from '../enums/user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.endpoint;
  readonly theParams = ['test1', 'test2'];

  constructor(private httpClient: HttpClient) { }

  getTextFile(): Observable<string>{
    return this.httpClient.get(`assets/text.txt`, { responseType: 'text'});
  }

  downloadFile(): Observable<HttpResponse<Blob>>{
    return this.httpClient.get(`assets/text.txt`, { responseType: 'blob', observe: 'response'});
  }

  getUsers(): Observable<Array<User>> {
    let myHeader = new HttpHeaders({"myheader": "headerValue"});
    myHeader = myHeader.set('id', '1235');
    myHeader = myHeader.append('id', '2569800');
    let myParams = new HttpParams().set('page', '1');
    myParams = myParams.append('name','junior');
    let params = new HttpParams({ fromObject: {['testList']: this.theParams }});
    return this.httpClient.get<Array<User>>(`${this.apiUrl}/users`, { params: params })
    .pipe(
      tap(users => console.log(users)),
      map(users => users.map(user => ({
        ...user,
        name: user.name.toUpperCase(),
        isAdmin: user.id === 10 ? 'admin' : 'user',
        searchkey: [user.name, user.username]
      })))
    );
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/1`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  patchUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${this.apiUrl}/users/${id}`);
  }

  uploadFiles(formData: FormData): Observable<HttpEvent<Array<String>>> {
    return this.httpClient.post<Array<String>>(`${this.apiUrl}/upload/files`, formData,
    { observe: 'events', reportProgress: true });
  }
}
