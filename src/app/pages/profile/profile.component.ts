import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api/users/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../services/api/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: Profile = {};
  showCropper: boolean = false;
  isMyProfile: boolean = true;
  param: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.param = this.activatedRoute.snapshot.params["userId"];
    if (this.param) {
      this.isMyProfile = false;
      this.userService.getUserById(this.param).subscribe({
        next: data => {
          this.user = data;
          if (this.user.avatarUrl === null) {
            this.user.avatarUrl = 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1';
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }
    else this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  closeModal() {
    this.showCropper = false;
  }
}
