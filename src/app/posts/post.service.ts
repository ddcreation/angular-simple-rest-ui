import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post.model';


const fake1 = {
  id: 1,
  title: 'Post 1',
  content: 'Content of post 1',
  lat: 3.54444,
  long: -2.8999,
  image_url: ''
};

const fake2 = {
  id: 2,
  title: 'Post 2',
  content: 'Content of post 2',
  lat: 3.54444,
  long: -2.8999,
  image_url: ''
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  get(id: number): Observable<Post> {
    return of(fake1);
  }

  list(): Observable<Post[]> {
    return of([fake1, fake2]);
  }
}
