import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../services/api/models/profile';

@Component({
  selector: 'app-create-post-box',
  templateUrl: './create-post-box.component.html',
  styleUrl: './create-post-box.component.scss'
})
export class CreatePostBoxComponent implements OnInit {

  createPostOverlay: boolean = false;
  @Input()
  user: Profile = {};

  ngOnInit(): void {

  }

  createPost() {
    this.createPostOverlay = true;
  }

  closeCreatePost() {
    this.createPostOverlay = false;
  }
}
