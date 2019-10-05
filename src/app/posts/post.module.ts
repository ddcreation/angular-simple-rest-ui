import { NgModule } from '@angular/core';

import {
  PostsListComponent,
  PostFormComponent,
  PostViewComponent,
  PostService,
  PostServiceMock,
  PostRouting,
  ExistingPostGuard
} from './index';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostsListComponent, PostFormComponent, PostViewComponent],
  imports: [PostRouting, SharedModule],
  providers: [
    // PostService,
    { provide: PostService, useClass: PostServiceMock },
    ExistingPostGuard
  ]
})
export class PostModule {}
