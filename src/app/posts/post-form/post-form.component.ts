import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/shared/app-settings';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
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
  formType = 'new';
  saveInProgress = false;

  private _loadPostSubscr: Subscription;
  private _savePostSubscr: Subscription;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _postService: PostService
  ) {}

  ngOnInit() {
    const postId = this._route.snapshot.params.id;

    if (postId) {
      this.formType = 'edit';

      this.postForm.addControl('id', new FormControl(''));
      this._loadPostSubscr = this._postService.current.subscribe(
        post => this.postForm.patchValue(post)
      );
    }
  }

  ngOnDestroy() {
    if (this._loadPostSubscr) {
      this._loadPostSubscr.unsubscribe();
    }

    if (this._savePostSubscr) {
      this._savePostSubscr.unsubscribe();
    }
  }

  submitPostForm(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    if (this._savePostSubscr) {
      this._savePostSubscr.unsubscribe();
    }

    const subscr =
      this.formType === 'new'
        ? this._postService.create(this.postForm.value)
        : this._postService.update(this.postForm.value);
    this._savePostSubscr = subscr.subscribe(
      () => {
        this.backToList();
      },
      err => console.log(err)
    );
  }

  get imgPreview(): string | null {
    return this.postForm && this.postForm.get('image_url').valid
      ? this.postForm.get('image_url').value
      : null;
  }

  backToList(): void {
    this._router.navigate(['posts', 'list']);
  }
}
