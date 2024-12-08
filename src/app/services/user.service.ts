import { CreateUser } from '../interfaces/create-user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  createUser(UserCreateDto: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user`, UserCreateDto);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }
}
