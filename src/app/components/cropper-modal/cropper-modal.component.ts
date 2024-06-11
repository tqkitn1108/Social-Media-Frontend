import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { PostService } from '../../services/api/post/post.service';
import { UserService } from '../../services/api/users/user.service';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrl: './cropper-modal.component.scss',
})
export class CropperModalComponent {
  @Input()
  userId: string = '';
  uploadedImage: boolean = false;
  @Output()
  isClosed: EventEmitter<boolean> = new EventEmitter();
  @Output()
  changeAvatar: EventEmitter<string> = new EventEmitter();

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  file: any;

  constructor(
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private userService: UserService
  ) {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.uploadedImage = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
    // event.blob can be used to upload the cropped image
    if (event.blob) {
      this.file = new File([event.blob], `${this.userId}_avatar.png`, { type: "image/png" });
    }
  }
  imageLoaded(image: LoadedImage) {
    // show cropper    
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  onClose() {
    this.isClosed.emit(true);
  }

  onChangeAvatar(url: string) {
    this.changeAvatar.emit(url);
  }

  onSave() {
    const formData = new FormData();
    formData.append('file', this.file);
    this.postService.uploadMedia(formData)
      .subscribe({
        next: data => {
          this.onChangeAvatar(data.url as string);
          this.userService.setAvatarUrl(data.url as string)
            .subscribe({
              next: (res) => {
                this.onClose();
              },
              error: (error) => {
                console.log(error);
              }
            });
        },
        error: err => {
          console.log(err);
        }
      })
  }

}
