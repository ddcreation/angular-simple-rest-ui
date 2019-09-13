import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/shared/app-settings';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  postForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    content: new FormControl(''),
    lat: new FormControl('', Validators.pattern(AppSettings.coordinatePattern)),
    long: new FormControl(
      '',
      Validators.pattern(AppSettings.coordinatePattern)
    ),
    image_url: new FormControl(
      '',
      Validators.pattern(AppSettings.imgUrlPattern)
    )
  });
  formType: string;

  private _loadPost: Subscription;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService
  ) {}

  ngOnInit() {
    const postId = this._route.snapshot.params['id'];

    if (postId === 'new') {
      this.formType = 'new';
    } else {
      this.formType = 'edit';

      this._loadPost = this._postService
        .read(postId)
        .subscribe(post => this.postForm.patchValue(post));
    }

    this.formType =
      this._route.snapshot.params['id'] === 'new' ? 'new' : 'edit';
  }

  ngOnDestroy() {
    if (this._loadPost) {
      this._loadPost.unsubscribe();
    }
  }

  submitPostForm(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
  }

  get imgPreview(): string | null {
    return this.postForm && this.postForm.get('image_url').valid
      ? this.postForm.get('image_url').value
      : null;
  }
}
