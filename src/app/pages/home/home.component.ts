import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { UserService } from '../../services/api/users/user.service';
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
    if (this.keycloakService.profile?.id) {
      this.loadContacts(this.keycloakService.profile?.id);
      this.loadFeed();
    }
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

  loadContacts(userId: string) {
    this.userService.getFriends(userId)
      .subscribe({
        next: data => {
          this.contacts = data;
        },
        error: err => {
          console.log(err);
        }
      })
  }
} 
