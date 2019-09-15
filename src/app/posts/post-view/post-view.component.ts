import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit, OnDestroy {
  private _loadPostSubscr: Subscription;
  post: Post;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService
  ) {}

  ngOnInit() {
    this._loadPostSubscr = this._postService.current.subscribe(
      post => (this.post = post)
    );
  }

  ngOnDestroy() {
    if (this._loadPostSubscr) {
      this._loadPostSubscr.unsubscribe();
    }
  }
}
