import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { UserService } from '../../services/api/users/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../services/api/models/profile';
import { Router } from '@angular/router';
import { FeedService } from '../../services/api/feed/feed.service';
import { Post } from '../../services/api/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private feedService: FeedService,
    private router: Router
  ) { }
  user: Profile = JSON.parse(localStorage.getItem('user') as string);
  openCreatePost: boolean = false;
  contacts: Profile[] = [];
  feed: Post[] = [];

  ngOnInit(): void {
    if (!this.isMatchedLocalStorage()) {
      this.userService.getCurrentUser()
        .subscribe({
          next: data => {
            this.user = data;
            if (this.user.avatarUrl === null) {
              this.user.avatarUrl = 'https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg';
              this.userService.setAvatarUrl('https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg').subscribe({
                error: err => {
                  console.log(err);
                }
              });
            }
            localStorage.setItem('user', JSON.stringify(this.user));
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          }
        })
    }
    if (this.user.id) {
      this.userService.getFriends(this.user.id)
        .subscribe({
          next: data => {
            this.contacts = data;
          },
          error: err => {
            console.log(err);
          }
        })
      this.loadFeed();
    }
  }

  isMatchedLocalStorage() {
    if (localStorage.getItem('user')) {
      const userId = JSON.parse(localStorage.getItem('user') as string).id;
      if (userId === this.keycloakService.profile?.id) return true;
      localStorage.removeItem('user');
    }
    return false;
  }

  loadFeed() {
    this.feedService.getMyFeed()
      .subscribe({
        next: data => {
          this.feed = data;
        },
        error: err => {
          console.log(err);
        }
      })
  }
} 
