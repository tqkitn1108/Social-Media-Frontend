import { Component, Input } from '@angular/core';
import { Comment } from '../../services/api/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input()
  comment: Comment = {};

  deleteComment(id: number){
    
  }
}
