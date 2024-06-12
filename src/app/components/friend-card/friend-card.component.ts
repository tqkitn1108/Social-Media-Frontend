import { Component } from '@angular/core';
import { Profile } from '../../services/api/models/profile';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.scss'
})
export class FriendCardComponent {
  user: Profile = {};
  isRequest: boolean = true;
}
