import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRequest } from '../models/post-request';
import { BaseService } from '../config/base.service';

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

  createPost(postRequest: PostRequest) {
    return this.http.post(`${this.rootUrl}/posts`, postRequest);
  }

  uploadMutilMedia(formData: FormData){
    return this.http.post(`${this.rootUrl}/medias/multi-upload`, formData)
  }

  uploadMedia(formData: FormData){
    return this.http.post(`${this.rootUrl}/medias/upload`, formData)
  }
}
