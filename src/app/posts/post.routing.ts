import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ExistingPostGuard } from './guards/existing-post.guard';
import { PostViewComponent } from './post-view/post-view.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PostsListComponent },
  { path: 'new', component: PostFormComponent },
  {
    path: ':id',
    canActivate: [ExistingPostGuard],
    children: [
      { path: 'edit', component: PostFormComponent },
      { path: '', component: PostViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRouting {}
