import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: PostsListComponent },
  { path: ':id', component: PostFormComponent },
  { path: ':id/show', component: PostViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRouting {}
