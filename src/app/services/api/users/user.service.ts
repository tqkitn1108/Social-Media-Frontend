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
    this.rootUrl = baseService.rootUrl + '/users';
  }

  getCurrentUser() {
    return this.http.get<Profile>(`${this.rootUrl}/me`);
  }

  getUserById(userId: string) {
    return this.http.get<Profile>(`${this.rootUrl}/summary/${userId}`);
  }

  setAvatarUrl(url: string) {
    return this.http.patch(`${this.rootUrl}/avatar`, { avatarUrl: url });
  }

}
