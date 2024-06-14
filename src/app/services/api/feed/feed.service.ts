import { Injectable } from '@angular/core';
import { BaseService } from '../config/base.service';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private rootUrl: string;

  constructor(private baseService: BaseService,
    private http: HttpClient
  ) {
    this.rootUrl = baseService.rootUrl + '/feeds';
  }

  getMyFeed() {
    return this.http.get<Post[]>(`${this.rootUrl}`);
  }
}
