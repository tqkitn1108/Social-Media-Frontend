import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../../services/api/models/post';
import { PostService } from '../../services/api/post/post.service';
import { ReactRequest } from '../../services/api/models/react-request';
import { Profile } from '../../services/api/models/profile';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input()
  post: Post = {};
  comment: any = {};
  reactRequest: ReactRequest = {};
  user: Profile = JSON.parse(localStorage.getItem('user') as string);

  constructor(private postService: PostService) { }

  deletePost(id: number) {

  }

  addReact() {
    this.reactRequest = {
      postId: this.post.id,
      type: 'LIKE',
      userId: this.user.id
    }
    this.postService.addReact(this.reactRequest)
      .subscribe({
        next: data => {
          this.post.reacted = !this.post.reacted;
        },
        error: err => {
          console.log(err);
        }
      })
  }

  createComment() {

  }

  deleteComment(id: number) {

  }
}
