import { Post } from '../post.model';
import { Observable, of } from 'rxjs';

export class PostServiceMock {

  fakeDatas: Post[] = [
    {
      id: 1,
      title: 'City 1',
      content: 'Content city 1',
      lat: 1.1111,
      long: 1.2222,
      image_url: 'https://via.placeholder.com/300.png'
    },
    {
      id: 2,
      title: 'City 2',
      content: 'Content city 2',
      lat: 2.1111,
      long: 2.2222,
      image_url: 'https://via.placeholder.com/150.png'
    }
  ];

  create(post: Post): Observable<Post> {
    return of({id: 3, ...post});
  }

  update(post: Post): Observable<Post> {
    return of(post);
  }

  read(id: number): Observable<Post> {
    const matchingPost = this.fakeDatas.find(post => post.id === id);
    return matchingPost ? of(matchingPost) : of (null);
  }

  list(): Observable<Post[]> {
    return of(this.fakeDatas);
  }

  delete(id: number) {
    return of(this.fakeDatas.filter(post => post.id !== id));
  }

  get current(): Observable<Post> {
    return of(this.fakeDatas[0]);
  }
}
