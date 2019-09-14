import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from 'selenium-webdriver/http';

describe('PostService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        MatSnackBarModule
      ],
      providers: [{ provide: HttpClient, useValue: HttpTestingController }]
    })
  );

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });
});
