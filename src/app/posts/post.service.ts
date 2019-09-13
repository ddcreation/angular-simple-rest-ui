import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _url = environment.apiUrl;
  private _endpoint = 'posts';

  constructor(protected httpClient: HttpClient) {}

  public create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this._url}/${this._endpoint}`, post);
  }

  public update(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(
      `${this._url}/${this._endpoint}/${post.id}`,
      post
    );
  }

  read(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this._url}/${this._endpoint}/${id}`);
  }

  list(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this._url}/${this._endpoint}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this._url}/${this._endpoint}/${id}`);
  }
}
