import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from 'selenium-webdriver/http';

describe('SnackbarService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [MatSnackBar, { provide: HttpClient, useValue: HttpTestingController }]
    })
  );

  it('should be created', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    expect(service).toBeTruthy();
  });
});
