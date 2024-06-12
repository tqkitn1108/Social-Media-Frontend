import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { PostRequest } from '../../services/api/models/post-request';
import { PostService } from '../../services/api/post/post.service';
import { Media } from '../../services/api/models/media';
import { Post } from '../../services/api/models/post';

@Component({
  selector: 'app-create-post-overlay',
  templateUrl: './create-post-overlay.component.html',
  styleUrl: './create-post-overlay.component.scss'
})
export class CreatePostOverlayComponent {
  constructor(private postService: PostService) { }
  @Input()
  user: Profile = {};

  @Output()
  isClose: EventEmitter<any> = new EventEmitter();
  @Output()
  isCreated: EventEmitter<Post> = new EventEmitter();

  imageDisplay: string = '';
  post: PostRequest = {};

  error: string = '';
  selectedFiles: any[] = [];
  mediaResponses: any = [];

  onClose() {
    this.isClose.emit();
  }

  createPost(medias: Media[]) {
    this.mediaResponses = medias;
    this.post.mediaIds = this.mediaResponses.map((media: any) => media.id);
    this.post.ownerId = this.user.id;
    this.post.status = 'PUBLIC';
    this.postService.createPost(this.post).subscribe({
      next: (data) => {
        this.onClose();
        this.isCreated.emit(data);
      },
      error: (err) => {
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
      this.createPost([]);
      return;
    }
    const formData = new FormData();
    this.selectedFiles.forEach(fileData => {
      formData.append('files', fileData.file);
    });

    // return new Promise((resolve, reject) => {
    //   this.postService.uploadMutilMedia(formData)
    //     .subscribe({
    //       next: (response) => {
    //         resolve(response);
    //       },
    //       error: (err: HttpErrorResponse) => {
    //         reject(err);
    //       }
    //     });
    // });
    this.postService.uploadMutilMedia(formData)
      .subscribe({
        next: (response) => {
          this.createPost(response);
        },
        error: (err) => {
          console.log(err);

        }
      })
  }
}
