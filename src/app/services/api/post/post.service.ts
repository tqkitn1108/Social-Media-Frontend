import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRequest } from '../models/post-request';
import { BaseService } from '../config/base.service';
import { Post } from '../models/post';
import { ReactRequest } from '../models/react-request';

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
    return this.http.post(`${this.rootUrl}/posts`, postRequest);
  }

  uploadMutilMedia(formData: FormData) {
    return this.http.post(`${this.rootUrl}/medias/multi-upload`, formData);
  }

  uploadMedia(formData: FormData) {
    return this.http.post(`${this.rootUrl}/medias/upload`, formData);
  }

  addReact(reactRequest: ReactRequest) {
    return this.http.post(`${this.rootUrl}/reacts`, reactRequest);
  }
}
