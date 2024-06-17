import { Injectable } from '@angular/core';
import { BaseService } from '../config/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';

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

  searchUser(query: string) {
    return this.http.get<Profile[]>(`${this.rootUrl}/search?query=${query}`);
  }

  addFriend(targetId: string) {
    return this.http.post(`${this.rootUrl}/add-friend/${targetId}`, {});
  }

  follow(targetId: string) {
    return this.http.post(`${this.rootUrl}/follow/${targetId}`, {});
  }

  getMyFriendPendings(userId: string) {
    return this.http.get<Profile[]>(`${this.rootUrl}/${userId}/pendings`);
  }

  acceptFriendRequest(targetId: string) {
    return this.http.post(`${this.rootUrl}/accept-friend/${targetId}`, {});
  }

  getFriends(userId: string) {
    return this.http.get<Profile[]>(`${this.rootUrl}/${userId}/friends`);
  }
}
