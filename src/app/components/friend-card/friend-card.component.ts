import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { UserService } from '../../services/api/users/user.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.scss'
})
export class FriendCardComponent {
  @Input()
  user: Profile = {};
  @Input()
  index: number = -1;
  isRequest: boolean = true;
  isAccepted: boolean = false;

  @Output()
  emitAccepted: EventEmitter<number> = new EventEmitter();

  constructor(private userService: UserService) { }

  confirm() {
    this.isAccepted = true;
    this.isRequest = false;
    if (this.user.id) {
      this.userService.acceptFriendRequest(this.user.id)
        .subscribe({
          next: data => {
            this.emitAccepted.emit(this.index);
          },
          error: err => {
            this.isAccepted = false;
            this.isRequest = true;
            console.log(err);
          }
        })
    }
  }
}
