import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private _rootUrl: string = 'http://localhost:8222/api/v1';

  get rootUrl() {
    return this._rootUrl;
  }
}
