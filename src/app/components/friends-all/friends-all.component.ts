import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { UserService } from '../../services/api/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-all',
  templateUrl: './friends-all.component.html',
  styleUrl: './friends-all.component.scss'
})
export class FriendsAllComponent implements OnInit {
  @Input()
  user: Profile = {};

  friends: Profile[] = [];

  constructor(private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.user.id) {
      this.userService.getFriends(this.user.id)
        .subscribe({
          next: data => {
            this.friends = data;
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }
}
