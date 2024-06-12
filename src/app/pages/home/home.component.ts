import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { UserService } from '../../services/api/users/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../services/api/models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private router: Router
  ) { }
  user: Profile = JSON.parse(localStorage.getItem('user') as string);
  openCreatePost: boolean = false;

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
  }

  isMatchedLocalStorage() {
    if (localStorage.getItem('user')) {
      const userId = JSON.parse(localStorage.getItem('user') as string).id;
      if (userId === this.keycloakService.profile?.id) return true;
      localStorage.removeItem('user');
    }
    return false;
  }
} 
