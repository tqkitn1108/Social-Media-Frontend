import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { Post } from '../../services/api/models/post';
import { UserService } from '../../services/api/users/user.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-create-post-box',
  templateUrl: './create-post-box.component.html',
  styleUrl: './create-post-box.component.scss'
})
export class CreatePostBoxComponent implements OnInit {
  createPostOverlay: boolean = false;
  user: Profile = JSON.parse(localStorage.getItem('user') as string);
  @Output()
  createdPost: EventEmitter<Post> = new EventEmitter();

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.loadUser();
  }

  createPost() {
    this.createPostOverlay = true;
  }

  closeCreatePost() {
    this.createPostOverlay = false;
  }

  emitCreatedPost(post: Post) {
    this.createdPost.emit(post);
  }

  loadUser() {
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
          error: error => {
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
