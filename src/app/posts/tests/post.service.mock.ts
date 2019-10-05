import { Post } from '../post.model';
import { Observable, of } from 'rxjs';

export class PostServiceMock {

  private _current: number = null;
  fakeDatas: Post[] = [
    {
      id: 1,
      title: 'Barcelona',
      content: `It's just a dream`,
      lat: 41.3833,
      long: 2.1833,
      image_url: 'https://commons.wikimedia.org/wiki/File:Barcelona_collage.JPG?uselang=fr'
    },
    {
      id: 2,
      title: 'Paris',
      content: `Capital of my native country`,
      lat: 48.8534,
      long: 2.3488,
      image_url: 'https://commons.wikimedia.org/wiki/File:Paris_-_Eiffelturm_und_Marsfeld2.jpg?uselang=fr'
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
