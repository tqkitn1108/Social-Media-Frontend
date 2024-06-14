import { Component, OnInit } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { UserService } from '../../services/api/users/user.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrl: './friends-page.component.scss'
})
export class FriendsPageComponent implements OnInit {
  user: Profile = JSON.parse(localStorage.getItem('user') as string);

  pendings: Profile[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.user.id) {
      this.userService.getMyFriendPendings(this.user.id)
        .subscribe({
          next: data => {
            this.pendings = data;
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

  // removeCard(index: number) {
  //   this.pendings.splice(index, 1);
  // }
}
