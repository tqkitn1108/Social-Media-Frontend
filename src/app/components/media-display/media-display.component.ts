import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media-display',
  templateUrl: './media-display.component.html',
  styleUrl: './media-display.component.scss'
})
export class MediaDisplayComponent {
  @Input()
  files: any[] = [];

  closeMedia(index: number) {
    this.files.splice(index, 1);
  }
}
