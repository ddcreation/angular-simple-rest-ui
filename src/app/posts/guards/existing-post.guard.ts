import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostService } from '../post.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExistingPostGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _postService: PostService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this._postService.read(parseInt(next.params.id, 10)).pipe(
      catchError(() => this.errorRedirect()),
      mergeMap(post => (post ? of(true) : this.errorRedirect()))
    );
  }

  errorRedirect(): Observable<boolean> {
    this._router.navigate(['/404']);
    return of(false);
  }
}
