import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from '../../services/api/models/profile';
import { Post } from '../../services/api/models/post';

@Component({
  selector: 'app-create-post-box',
  templateUrl: './create-post-box.component.html',
  styleUrl: './create-post-box.component.scss'
})
export class CreatePostBoxComponent implements OnInit {

  createPostOverlay: boolean = false;
  @Input()
  user: Profile = {};
  @Output()
  createdPost: EventEmitter<Post> = new EventEmitter();

  ngOnInit(): void {

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
}
