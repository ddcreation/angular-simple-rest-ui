import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  postsSource: Observable<Post[]>;
  displayedColumns: string[] = ['title', 'content', 'actions'];

  constructor(private readonly _posts: PostService) { }

  ngOnInit() {
    this.postsSource = this._posts.list();
  }

  filterPosts(): void {

  }

}
