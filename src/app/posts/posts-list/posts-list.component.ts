import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  postsSource = new BehaviorSubject<Post[]>([]);
  displayedColumns: string[] = ['title', 'content', 'actions'];

  _listPostSubscription: Subscription;
  _deletePostSubscr: Subscription;

  constructor(private readonly _postService: PostService, private readonly _router: Router) {}

  ngOnInit() {
    this.refreshDatas();
  }

  ngOnDestroy() {
    if (this._deletePostSubscr) {
      this._deletePostSubscr.unsubscribe();
    }
  }

  deletePost(id: number): void {
    if (this._deletePostSubscr) {
      this._deletePostSubscr.unsubscribe();
    }
    this._deletePostSubscr = this._postService.delete(id).subscribe(() => {
      this.refreshDatas();
    }, err => console.log(err));
  }

  refreshDatas() {
    if (this._listPostSubscription) {
      this._listPostSubscription.unsubscribe();
    }
    this._listPostSubscription = this._postService
      .list()
      .subscribe(posts => this.postsSource.next(posts), err => console.log(err));
  }

  show(id: number) {
    this._router.navigate(['/posts/' + id]);
  }
}
