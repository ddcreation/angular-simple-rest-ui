import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { ExistingPostGuard } from './existing-post.guard';
import { PostServiceMock } from '../tests/post.service.mock';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

describe('ExistingPostGuard', () => {
  const createMockRoute = (id: number) => {
    return {
      params: { id: id }
    } as any;
  };

  let router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExistingPostGuard,
        { provide: Router, useValue: router },
        { provide: PostService, useValue: new PostServiceMock() }
      ]
    });
  });

  it('should be created', () => {
    const existingPostGuard = TestBed.get(ExistingPostGuard);
    expect(existingPostGuard).toBeTruthy();
  });

  it('should pass if ID exist', () => {
    const route = createMockRoute(2);
    const existingPostGuard = TestBed.get(ExistingPostGuard);
    existingPostGuard
        .canActivate(route)
        .subscribe(result => expect(result).toEqual(true));
  });

  it('should block if ID does not exist', inject(
    [ExistingPostGuard],
    (guard: ExistingPostGuard) => {
      const route = createMockRoute(999);
      const existingPostGuard = TestBed.get(ExistingPostGuard);
      existingPostGuard
        .canActivate(route)
        .subscribe(result => expect(result).toEqual(false));
      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    }
  ));
});
