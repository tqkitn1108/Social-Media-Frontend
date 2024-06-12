import { Component } from '@angular/core';
import { Profile } from '../../services/api/models/profile';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrl: './friends-page.component.scss'
})
export class FriendsPageComponent {
  user: Profile = JSON.parse(localStorage.getItem('user') as string);
}
