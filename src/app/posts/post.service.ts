import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { SnackbarService } from '../shared/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _url = environment.apiUrl;
  private _endpoint = 'posts';
  private _current = new BehaviorSubject<Post>(null);

  constructor(
    private readonly _http: HttpClient,
    private readonly _snackbar: SnackbarService
  ) {}

  public create(post: Post): Observable<Post> {
    return this._http.post<Post>(`${this._url}/${this._endpoint}`, post).pipe(
      tap(
        () => this._snackbar.success('post.api.create.success'),
        err => {
          this._snackbar.error('post.api.create.error');
          console.error(err);
          return of(null);
        }
      )
    );
  }

  public update(post: Post): Observable<Post> {
    return this._http
      .put<Post>(`${this._url}/${this._endpoint}/${post.id}`, post)
      .pipe(
        tap(
          () => this._snackbar.success('post.api.update.success'),
          err => {
            this._snackbar.error('post.api.update.error');
            console.error(err);
            return of(null);
          }
        )
      );
  }

  read(id: number): Observable<Post> {
    return this._http
      .get<Post>(`${this._url}/${this._endpoint}/${id}`)
      .pipe(tap(post => this._current.next(post)));
  }

  list(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this._url}/${this._endpoint}`);
  }

  delete(id: number) {
    return this._http.delete(`${this._url}/${this._endpoint}/${id}`).pipe(
      tap(
        () => this._snackbar.success('post.api.delete.success'),
        err => {
          this._snackbar.error('post.api.delete.error');
          console.error(err);
          return of(null);
        }
      )
    );
  }

  get current(): Observable<Post> {
    return this._current;
  }
}
