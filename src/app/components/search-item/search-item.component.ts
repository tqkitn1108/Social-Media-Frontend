import { Component, Input } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { UserService } from '../../services/api/users/user.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Input()
  user: Profile = {};

  constructor(private userService: UserService) { }

  follow() {
    this.user.following = true;
    if (this.user.id) {
      this.userService.follow(this.user.id)
        .subscribe({
          next: data => {
            console.log(data);
          },
          error: err => {
            this.user.following = false;
            console.log(err);
          }
        })
    }
  }

  addFriend() {
    if (this.user.id) {
      this.userService.addFriend(this.user.id)
        .subscribe({
          next: data => {
            console.log(data);
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }
}
