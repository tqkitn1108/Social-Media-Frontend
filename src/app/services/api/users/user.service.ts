import { Injectable } from '@angular/core';
import { BaseService } from '../config/base.service';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootUrl: string;

  constructor(private baseService: BaseService,
    private http: HttpClient
  ) {
    this.rootUrl = baseService.rootUrl
  }

  getCurrentUser() {
    return this.http.get<Profile>(`${this.rootUrl}/users/me`);
  }

  getUserById(userId: string) {
    return this.http.get<Profile>(`${this.rootUrl}/users/summary/${userId}`)
  }

}
