import { NgModule } from '@angular/core';

import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostService } from './post.service';
import { PostServiceMock } from './tests/post.service.mock';
import { PostRouting } from './post.routing';
import { SharedModule } from '../shared/shared.module';
import { ExistingPostGuard } from './guards/existing-post.guard';

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
