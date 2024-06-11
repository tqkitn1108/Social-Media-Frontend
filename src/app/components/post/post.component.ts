import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../../services/api/models/post';
import { PostService } from '../../services/api/post/post.service';
import { ReactRequest } from '../../services/api/models/react-request';
import { Profile } from '../../services/api/models/profile';
import { Media } from '../../services/api/models/media';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input()
  post: Post = {};
  commentRequest: any = {};
  showComment: boolean = false;
  reactRequest: ReactRequest = {};
  user: Profile = JSON.parse(localStorage.getItem('user') as string);
  selectedFiles: any[] = [];
  mediaResponses: any = [];
  comments: any[] = [];

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

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({
          file: file,
          type: file.type,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      this.createComment([]);
      return;
    }
    const formData = new FormData();
    this.selectedFiles.forEach(fileData => {
      formData.append('files', fileData.file);
    });

    this.postService.uploadMutilMedia(formData)
      .subscribe({
        next: (response) => {
          this.createComment(response);
        },
        error: (err) => {
          console.log(err);

        }
      }
      )
  }

  onOpenComment() {
    this.showComment = true;
  }

  createComment(response: Media[]) {
    this.mediaResponses = response;
    this.commentRequest.mediaIds = this.mediaResponses.map((media: any) => media.id);
    this.commentRequest.userId = this.user.id;
    this.commentRequest.postId = this.post.id;
    this.postService.addComment(this.commentRequest).subscribe({
      next: (data) => {
        this.selectedFiles = [];
        this.commentRequest.content = '';
        this.comments.push(data);
        this.showComment = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteComment(id: number) {

  }
}
