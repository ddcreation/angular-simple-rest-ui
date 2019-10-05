import { Post } from '../index';
import { Observable, of } from 'rxjs';

export class PostServiceMock {

  private _current: number = null;
  fakeDatas: Post[] = [
    {
      id: 1,
      title: 'Barcelona',
      content: `It's my dream`,
      lat: 41.3833,
      long: 2.1833,
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Barcelona_collage.JPG/1200px-Barcelona_collage.JPG'
    },
    {
      id: 2,
      title: 'Paris',
      content: `Capital of my native country`,
      lat: 48.8534,
      long: 2.3488,
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/1164px-Paris_-_Eiffelturm_und_Marsfeld2.jpg'
    }
  ];

  create(post: Post): Observable<Post> {
    const newPost = { id: this.fakeDatas.length + 1, ...post };
    this.fakeDatas.push(newPost);
    return of(newPost);
  }

  update(post: Post): Observable<Post> {
    return of({ ...this.fakeDatas.find(city => city.id === post.id), ...post });
  }

  read(id: number): Observable<Post> {
    const matchingPost = this.fakeDatas.find(post => post.id === id);
    this._current = id;
    return matchingPost ? of(matchingPost) : of(null);
  }

  list(): Observable<Post[]> {
    return of(this.fakeDatas);
  }

  delete(id: number) {
    return of(this.fakeDatas.filter(post => post.id !== id));
  }

  get current(): Observable<Post> {
    return this.read(this._current);
  }
}
