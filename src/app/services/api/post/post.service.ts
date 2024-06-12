import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRequest } from '../models/post-request';
import { BaseService } from '../config/base.service';
import { Post } from '../models/post';
import { ReactRequest } from '../models/react-request';
import { Media } from '../models/media';
import { CommentRequest } from '../models/comment-request';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private rootUrl: string;

  constructor(private baseService: BaseService,
    private http: HttpClient
  ) {
    this.rootUrl = baseService.rootUrl
  }

  getPostsByOwnerId(ownerId: string) {
    return this.http.get<Post[]>(`${this.rootUrl}/posts/owner/${ownerId}`);
  }

  createPost(postRequest: PostRequest) {
    return this.http.post<Post>(`${this.rootUrl}/posts`, postRequest);
  }

  uploadMutilMedia(formData: FormData) {
    return this.http.post<Media[]>(`${this.rootUrl}/medias/multi-upload`, formData);
  }

  uploadMedia(formData: FormData) {
    return this.http.post<Media>(`${this.rootUrl}/medias/upload`, formData);
  }

  addReact(reactRequest: ReactRequest) {
    return this.http.post(`${this.rootUrl}/reacts`, reactRequest);
  }

  addComment(commentRequest: CommentRequest){
    return this.http.post<Comment>(`${this.rootUrl}/comments`, commentRequest)
  }

  getCommentsByPost(postId: number){
    return this.http.get<Comment[]>(`${this.rootUrl}/comments/post/${postId}`);
  }
}
