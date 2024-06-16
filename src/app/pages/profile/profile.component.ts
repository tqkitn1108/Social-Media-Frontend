import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api/users/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../services/api/models/profile';
import { PostService } from '../../services/api/post/post.service';
import { Post } from '../../services/api/models/post';
import { Media } from '../../services/api/models/media';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  me: Profile = JSON.parse(localStorage.getItem('user') as string);
  user: Profile = {};
  showCropper: boolean = false;
  isMyProfile: boolean = true;
  posts: Post[] = [];
  medias: Media[] = [];
  subContent: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['userId'];
      this.loadProfile(userId);
    });
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.subContent = queryParams['sc'];
      const userId = this.activatedRoute.snapshot.params['userId'];
      if (this.subContent) this.openFriends();
      else this.openPosts(userId);
    });
  }

  loadProfile(userId: string) {
    if (userId && userId !== this.me.id) {
      this.isMyProfile = false;
      this.userService.getUserById(userId).subscribe({
        next: data => {
          this.user = data;
          if (this.user.avatarUrl === null) {
            this.user.avatarUrl = 'https://res.cloudinary.com/dxwdkeign/image/upload/v1718177786/qy79yhrfgenypywfaznb.jpg';
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }
    else this.user = this.me;
    this.postService.getPostsByOwnerId(userId || this.user.id as string).subscribe({
      next: data => {
        this.posts = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadPhotos(userId: string) {
    if (userId === undefined) userId = this.user.id || '';
    this.postService.getMediasByOwner(userId)
      .subscribe({
        next: data => {
          this.medias = data;
        },
        error: err => {
          console.log(err);
        }
      })
  }

  closeModal() {
    this.showCropper = false;
  }

  onChangeAvatar(url: string) {
    this.user.avatarUrl = url;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  openFriends() {
    const userId = this.user.id;
    const queryParams = {
      'sc': 'friends'
    }
    this.router.navigate(['/profile', userId], { queryParams });
  }

  openPosts(userId: string) {
    this.loadPhotos(userId);
    if (userId === this.me.id || userId === undefined)
      this.router.navigate(['/profile/me']);
    else
      this.router.navigate(['/profile', userId]);
  }

  addToPosts(post: Post) {
    this.posts.unshift(post);
  }
}
