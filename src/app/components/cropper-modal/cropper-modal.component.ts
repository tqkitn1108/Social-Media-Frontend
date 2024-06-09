import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrl: './cropper-modal.component.scss',
})
export class CropperModalComponent {

  uploadedImage: boolean = false;
  @Output()
  isClosed: EventEmitter<boolean> = new EventEmitter();

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.uploadedImage = true;
  }
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
    // event.blob can be used to upload the cropped image
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
}
